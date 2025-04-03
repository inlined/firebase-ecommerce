import getServerApp from "@/lib/firebase/getServerApp";
import getAuth from "@/lib/firebase/getAuth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// TODO: Handle app names other than DEFAULT

/*
const ID_TOKEN_COOKIE = { path: "/", secure: secureCookies, sameSite: "strict", partitioned: true, name: ID_TOKEN_COOKIE_NAME, maxAge: 34560000, priority: 'high' } as const;
const REFRESH_TOKEN_COOKIE = { ...ID_TOKEN_COOKIE, httpOnly: true, name: REFRESH_TOKEN_COOKIE_NAME } as const;
*/

interface Cookie {
    path: string;
    secure: boolean;
    sameSite: "strict";
    partitioned: true;
    name: string;
    maxAge: number;
    priority: "high";
}


async function canHandSecure(req: NextRequest): Promise<boolean> {
   if (req.nextUrl.protocol === "https") {
    return true;
   }
   const userAgent = (await headers()).get('User-Agent');
   return !!userAgent && (!userAgent?.includes('Safari') || userAgent.includes("Chrome"));
}

function authEmulatorConnected(): boolean {
    return !!getAuth().emulatorConfig
}

function cookieNames(appName: string = "DEFAULT"): { identity: string; refresh: string } {
    return authEmulatorConnected() ? {
        identity: `__dev_FIREBASE_[${appName}]`,
        refresh: `__dev_FIREBASEID_[${appName}]']`,
    } : {
        identity: `__HOST-FIREBASE_[${appName}]`,
        refresh: `__HOST-FIREBASEID_[${appName}]`,
    };
}

export async function logOutInResponse(resp: NextResponse) {
    const names = cookieNames();
    resp.cookies.delete(names.identity);
    resp.cookies.delete(names.refresh);
}

export async function DELETE(req: NextRequest) {
    console.log("Logging out");
    const resp = new NextResponse("", { status: 200 });
    logOutInResponse(resp);
    return resp;
}

function getPurpose(url: URL): ('mint' | 'refresh' | 'invalid') {
    if (authEmulatorConnected()) {
        return url.pathname === '/securetoken.googleapis.com/v1/token'
        ? 'refresh'
        : url.pathname.startsWith('/identitytoolkit.googleapis.com/v1/accounts:')
        ? 'mint'
        : 'invalid';
    }
    if (url.protocol != 'https') {
        return 'invalid';
    }
    if (url.hostname === 'securetoken.googelapis.com' && url.pathname === '/v1/token') {
        return 'refresh';
    }
    if (url.hostname === 'identitytoolkit.googleapis.com' && url.pathname.startsWith('/v1/accounts:')) {
        return 'mint'
    }
    return 'invalid'
}

// N.B. Must be lower case
const TRUSTED_HEADERS = [
    "referrer",
    "referrer-policy",
    "content-type",
    "x-firebase-client",
    "x-firebase-gmpid",
    "x-firebase-appcheck",
    "x-firebase-locale",
    "x-client-version",
];

function redactHeaders(headers: Headers): Record<string, string> {
    return Object.fromEntries(
        TRUSTED_HEADERS.filter((name) => headers.has(name)).map((name) => [name, headers.get(name)!])
    );
}

/**
 * 
 * @param req 
 */
async function refreshBody(req: NextRequest): Promise<string> {
    let body = await req.text();
    const params = new URLSearchParams(body!.trim());
    if (params.has("refresh_token")) {
        const refreshToken = req.cookies.get(cookieNames().refresh)?.value;
        if (refreshToken) {
            params.set("refresh_token", refreshToken);
            body = params.toString();
        }
    }
    return body;
}

export async function POST(req: NextRequest) {
    const redirectTo = new URL(req.nextUrl.searchParams.get('finalTarget')!);
    const purpose = getPurpose(redirectTo);
    console.log("The purpose of", redirectTo.href, "is", purpose);
    if (purpose === 'invalid') {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Sign in requests are JSON requests that can be forwarded directly, but
    // refresh requests are missing a refresh token that is only present in the HTTPOnly
    // cookie. The body must be parsed and recreated to include this token.
    // We don't fail when this cookie is missing so that we are guaranteed to recreate the
    // exact error for the client SDK that it would get if it tried to refresh with local storage.
    const body = purpose === 'refresh' ? await refreshBody(req) : req.body;
    const headers = redactHeaders(req.headers);
    
    // Because we are sometimes piping bodies directly from one service to another, we need to
    // set duplex: 'half' in Node 18+, but old versions of the type libraries will say that this
    // field doesn't exist and error out. Using a literal const and then passing it as a parameter
    // shuts up the type error.
    const proxyRequest = { method: 'Post', body, headers, duplex: 'half' }; 
    const proxied = await fetch(redirectTo, proxyRequest);
    if (!proxied.ok) {
        return new NextResponse(proxied.body, { status: proxied.status, statusText: proxied.statusText });
    }
    const json = await proxied.json();
    const refreshToken = json.refreshToken || json.refresh_token;
    const idToken = json.idToken || json.id_token;
    const maxAge = json.expiresIn || json.expires_in;

    const names = cookieNames();
    const response = NextResponse.json(json, { status: proxied.status, statusText: proxied.statusText });
    const baseCookie = {
        path: "/",
        secure: await canHandSecure(req),
        sameSite: "strict",
        partitioned: true,
        maxAge: 34560000,
        priority: 'high'
    } as const;
    if (idToken && idToken !== req.cookies.get(names.identity)?.value) {
        response.cookies.set({...baseCookie, name: names.identity, maxAge, value: idToken});
    }
    if (refreshToken) {
        response.cookies.set({...baseCookie, name: names.refresh, httpOnly: true, value: refreshToken});
    }

    return response;
}

export async function middleware(req: NextRequest) {
    if (req.nextUrl.basePath !== "/__cookies__") {
        return NextResponse.next();
    }
    switch (req.method) {
        case "DELETE":
            return DELETE(req);
        case "POST":
            return POST(req);
        default:
            return NextResponse.error();
    }
}