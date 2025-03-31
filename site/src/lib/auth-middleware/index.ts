import { NextResponse, NextRequest } from 'next/server';
import { createRemoteJWKSet, jwtVerify, JWTPayload, JWTHeaderParameters } from 'jose';
import { getDefaultAppConfig } from "@firebase/util";
import { FirebaseOptions } from 'firebase/app';

type FirebaseJWTPayload = JWTPayload & { firebase?: { tenant?: string }};

type RunMiddlewareOptions = { apiKey: string, projectId: string, emulatorHost: string|undefined, tenantId: string|undefined, authDomain: string|undefined };
type RunMiddlewareResponse = [NextResponse]|[undefined, ((response: NextResponse) => NextResponse), FirebaseJWTPayload|undefined];
async function runMiddleware(options: RunMiddlewareOptions, request: NextRequest): Promise<RunMiddlewareResponse> {
    if (request.nextUrl.pathname.startsWith("/__/") && options.authDomain) {
        const newURL = new URL(request.nextUrl);
        newURL.host = options.authDomain;
        newURL.port = '';
        return [NextResponse.rewrite(newURL)];
    }

    const isDevMode = process.env.NODE_ENV === 'development';
    const userAgent = request.headers.get('User-Agent');
    const isSafari = userAgent?.includes('Safari') && !userAgent?.includes("Chrome");
    const secureCookies = isSafari ? !isDevMode : true; // Safari can't do secure cookies on localhost
    // Need two different cookie names as Chrome doesn't allow __HOST- on localhost
    const ID_TOKEN_COOKIE_NAME = isDevMode ? `__dev_FIREBASE_[DEFAULT]` : `__HOST-FIREBASE_[DEFAULT]`;
    const REFRESH_TOKEN_COOKIE_NAME = isDevMode ? '__dev_FIREBASEID_[DEFAULT]' : `__HOST-FIREBASEID_[DEFAULT]`;
    console.log({ isDevMode, isSafari, secureCookies, ID_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME });
    // TODO max-age should be ttl
    const ID_TOKEN_COOKIE = { path: "/", secure: secureCookies, sameSite: "strict", partitioned: true, name: ID_TOKEN_COOKIE_NAME, maxAge: 34560000, priority: 'high' } as const;
    const REFRESH_TOKEN_COOKIE = { ...ID_TOKEN_COOKIE, httpOnly: true, name: REFRESH_TOKEN_COOKIE_NAME } as const;

    if (request.nextUrl.pathname === '/__cookies__') {
        const method = request.method;
        if (method === 'DELETE') {
            const response = new NextResponse("");
            response.cookies.delete({...ID_TOKEN_COOKIE, maxAge: 0});
            response.cookies.delete({...REFRESH_TOKEN_COOKIE, maxAge: 0});
            return [response];
        }

        const headers = Object.fromEntries([
                "referrer",
                "referrer-policy",
                "content-type",
                "X-Firebase-Client",
                "X-Firebase-gmpid",
                "X-Firebase-AppCheck",
                "X-Firebase-Locale",
                "X-Client-Version",
            ].
            filter((header) => request.headers.has(header)).
            map((header) => [header, request.headers.get(header)!])
        );

        const url = new URL(request.nextUrl.searchParams.get('finalTarget')!);
        
        let body: ReadableStream<any>|string|null = request.body;

        // TODO error if emulated and not hitting emulators
        const isTokenRequest = !!url.pathname.match(/^(\/securetoken\.googleapis\.com)?\/v1\/token/);
        const isSignInRequest = !!url.pathname.match(/^(\/identitytoolkit\.googleapis\.com)?\/v1\/accounts:signInWith/);
        
        if (!isTokenRequest && !isSignInRequest) throw new Error("Could not determine the request type to proxy");

        if (isTokenRequest) {
            body = await request.text();
            const bodyParams = new URLSearchParams(body!.trim());
            if (bodyParams.has("refresh_token")) {
                const refreshToken = request.cookies.get({ ...REFRESH_TOKEN_COOKIE, value: "" })?.value;
                if (refreshToken) {
                    bodyParams.set("refresh_token", refreshToken);
                    body = bodyParams.toString();
                }
            }
        }
        
        const response = await fetch(url, { method, body, headers });
    
        const json = await response.json() as any; // TODO better types here
        const status = response.status;
        const statusText = response.statusText;
        if (!response.ok) {
            const nextResponse = NextResponse.json(json, { status, statusText });
            return [nextResponse];
        }
        let refreshToken;
        let idToken;
        let maxAge;
        if (isSignInRequest) {
            refreshToken = json.refreshToken;
            idToken = json.idToken;
            maxAge = json.expiresIn;
            json.refreshToken = "REDACTED";
        } else {
            refreshToken = json.refresh_token;
            idToken = json.id_token;
            maxAge = json.expires_in;
            json.refresh_token = "REDACTED";
        }

        const currentIdToken = request.cookies.get({ ...ID_TOKEN_COOKIE, value: "" })?.value;
        const nextResponse = NextResponse.json(json, { status, statusText });
        if (idToken && currentIdToken !== idToken) nextResponse.cookies.set({...ID_TOKEN_COOKIE, maxAge, value: idToken });
        if (refreshToken) nextResponse.cookies.set({...REFRESH_TOKEN_COOKIE, value: refreshToken });
        return [nextResponse];
    }

    const logout = (): RunMiddlewareResponse => {
        const decorateNextResponse = (response: NextResponse) => {
            if (request.cookies.get(ID_TOKEN_COOKIE_NAME)) response.cookies.delete({...ID_TOKEN_COOKIE, maxAge: 0});
            if (request.cookies.get(REFRESH_TOKEN_COOKIE_NAME)) response.cookies.delete({...REFRESH_TOKEN_COOKIE, maxAge: 0});
            return response;
        }
        return [undefined, decorateNextResponse, undefined];
    }

    const authIdToken = request.cookies.get({ ...ID_TOKEN_COOKIE, value: "" })?.value;
    const refresh_token = request.cookies.get({...REFRESH_TOKEN_COOKIE, value: "" })?.value;

    if (authIdToken === undefined && !refresh_token) {
        console.error("no authIdToken && no refresh token");
        return [undefined, it => it, undefined];
    }

    if (authIdToken === "") {
        console.error("logout sentinel detected");
        return logout();
    }

    if (!refresh_token) {
        console.log("missing refresh token.");
        return logout();
    }

    let isEmulatedCredential;
    let jwtPayload;
    
    if (authIdToken) {

        let jwtHeader;
        try {
            [jwtHeader, jwtPayload] = authIdToken.split(".").slice(0,2).map(it => JSON.parse(atob(it))) as [JWTHeaderParameters, FirebaseJWTPayload];
        } catch(e) {
            console.error("Unable to parse JWT.");
        }

        if (jwtHeader?.typ !== 'JWT' || jwtPayload?.iss !== `https://securetoken.google.com/${options.projectId}` || jwtPayload.aud !== options.projectId || jwtPayload.firebase?.tenant !== options.tenantId) {
            console.error("I hates the claims.");
            jwtPayload = undefined;
        }
        if (jwtHeader?.alg === 'none') {
            isEmulatedCredential = true;
        } else if (jwtHeader?.alg !== 'RS256') {
            console.error("I hates the alg.");
            jwtPayload = undefined;
        }

        if (isEmulatedCredential && !options.emulatorHost) throw new Error("could not determine emulator hostname.");

        if (jwtPayload) {
            const muchEpochWow = Math.floor(+new Date() / 1000);
            if (jwtPayload.exp && jwtPayload.exp > muchEpochWow) {
                if (isEmulatedCredential) {
                    console.log("We good, its emulated.");
                    return [undefined, it => it, jwtPayload];
                } else {
                    try {
                        const jwks = createRemoteJWKSet(new URL('https://www.googleapis.com/robot/v1/metadata/jwk/securetoken@system.gserviceaccount.com'));
                        await jwtVerify(authIdToken, jwks);
                        console.log("JOSE is happy.");
                        return [undefined, it => it, jwtPayload];
                    } catch(e) {
                        console.error("JOSE is a hater.");
                    }
                }
            } else {
                console.error("So exp, wow.");
            }
        }
    }

    try {
        isEmulatedCredential ??= !!JSON.parse(Buffer.from(decodeURIComponent(refresh_token), 'base64').toString())["_AuthEmulatorRefreshToken"];
    } catch(e) {

    }

    if (isEmulatedCredential && !options.emulatorHost) throw new Error("could not determine emulator hostname.");

    console.log("attempting a refresh with", { isEmulatedCredential });

    const refreshUrl = new URL(isEmulatedCredential ? `http://${options.emulatorHost}` : `https://securetoken.googleapis.com`);
    refreshUrl.pathname = [isEmulatedCredential && 'securetoken.googleapis.com', 'v1/token'].filter(Boolean).join('/');
    refreshUrl.searchParams.set("key", options.apiKey);
    const body = new URLSearchParams({ grant_type: "refresh_token", refresh_token });
    const refreshResponse = await fetch(refreshUrl, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    if (!refreshResponse.ok) {
        console.error(refreshUrl.toString(), refreshResponse.status, refreshResponse.statusText);
        return logout();
    }
    const json = await refreshResponse.json() as any;
    const newRefreshToken = json.refresh_token;
    const newIdToken = json.id_token;
    jwtPayload = JSON.parse(atob(newIdToken.split(".")[1]));
    console.log(jwtPayload);
    const decorateNextResponse = (response: NextResponse) => {
        if (newIdToken) response.cookies.set({ ...ID_TOKEN_COOKIE, value: newIdToken });
        if (newRefreshToken)  response.cookies.set({ ...REFRESH_TOKEN_COOKIE, value: newRefreshToken });
        return response;
    }
    return [undefined, decorateNextResponse, jwtPayload];
}

interface Config {
    options?: FirebaseOptions,
    emulator?: boolean | string,
    tenantId?: string | ((request: NextRequest) => Resolvable<string>),
}

type Resolvable<T> = Promise<T> | T;
type Innie = (request: NextRequest, idTokenPayload: JWTPayload|undefined) => Resolvable<NextResponse|void>;

export const composeMiddleware = (configOrInnie?: Config|Innie, optionalInnie?: Innie) => async (request: NextRequest) => {
    const config = typeof configOrInnie === "object" ? configOrInnie : {};
    const tenantId = typeof config.tenantId === "function" ? await Promise.resolve(config.tenantId(request)) : config.tenantId;
    const firebaseOptions = config.options || getDefaultAppConfig() as FirebaseOptions|undefined;
    if (!firebaseOptions) throw new Error("Could not find Firebase configuration");
    const { apiKey, projectId, authDomain } = firebaseOptions;
    if (!apiKey) throw new Error("apiKey must be defined.");
    if (!projectId) throw new Error("projectId must be defined");
    const emulatorHost = typeof config.emulator === 'string' ? config.emulator : process.env.FIREBASE_AUTH_EMULATOR_HOST;
    const useEmulator = !!(config.emulator ?? emulatorHost);
    if (useEmulator && !emulatorHost) throw new Error("Could not determine emulator host");
    const innie = typeof configOrInnie === "function" ? configOrInnie : optionalInnie || ((_: NextRequest) => {});
    const options = { apiKey, projectId, emulatorHost, tenantId, authDomain };
    const [response, decorateResponse, idTokenPayload] = await runMiddleware(options, request);
    if (response) return response;
    const userResponse = await Promise.resolve(innie(request, idTokenPayload)) || NextResponse.next();
    return decorateResponse(userResponse);
};