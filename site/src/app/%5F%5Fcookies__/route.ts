/**
 * This file handles the magic route that the Firebase Auth SDK (Client) uses to (re)generate tokens
 * when using cookie persistence. Cookie persistence has two benefits:
 * 1. Session state is automatically synchronized between client and server.
 * 2. Refresh tokens are not accessible to any JavaScript because it is stored in an HTTPOnly cookie,
 *    protecting users against XSS attacks.
 * 
 * Note that %5F is the HTML escape for underscore (_). The magic URL is __cookies__ but Next.js
 * considers all directories that start with _ to be private and does not serve them. HTML escaping
 * the path name is considered the fix.
 */

import getAuth from "@/lib/firebase/getAuth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import getApp from "@/lib/firebase/getApp";

interface Cookie {
    path: string;
    sameSite: 'strict';
    partitioned: boolean;
    maxAge: number;
    priority: 'high';
    name: string;
    secure: boolean;
    httpOnly: boolean;
}

const baseCookie: Omit<Cookie, 'name' | 'secure' | 'httpOnly'> = {
    path: "/",
    sameSite: "strict",
    partitioned: true,
    maxAge: 34560000,
    priority: 'high'
};

async function canHandSecure(req: NextRequest): Promise<boolean> {
   if (req.nextUrl.protocol === "https") {
    return true;
   }
   const userAgent = (await headers()).get('User-Agent');
   return !!userAgent && (!userAgent?.includes('Safari') || userAgent.includes("Chrome"));
}

function authEmulatorConnected(): boolean {
    return !!getAuth(getApp()).emulatorConfig
}

async function getCookies(req: NextRequest): Promise<{ identity: Cookie, refresh: Cookie }> {
    const appName = req.nextUrl.searchParams.get('appName') || 'DEFAULT';
    const emulated = authEmulatorConnected();
    const secure = await canHandSecure(req);
    return {
        identity: {
            ...baseCookie,
            name: emulated ? `__dev_FIREBASE_[${appName}]` : `__HOST-FIREBASE_[${appName}]`,
            httpOnly: false,
            secure,
        },
        refresh: {
            ...baseCookie,
            name: emulated ? `__dev_FIREBASEID_[${appName}]` : `__HOST-FIREBASEID_[${appName}]`,
            httpOnly: true,
            secure,
        }
    }
}

export async function DELETE(req: NextRequest) {
    console.log("Logging out");
    const resp = new NextResponse("", { status: 200 });
    const appName = req.nextUrl.searchParams.get('appName');
    const cookies = await getCookies(req);
    console.log("Deleting cookies");
    const secure = await canHandSecure(req);
    resp.cookies.delete(cookies.identity);
    resp.cookies.delete(cookies.refresh);
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
    if (url.protocol != 'https:') {
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
 * When forwarding a token refresh request, we must parse and re-inject the refresh_token that
 * the server expects, but the CSR JS client could not form because the value is in an HTTPOnly
 * cookie.
 */
async function bodyForTokenRefresh(req: NextRequest, refreshCookie: Cookie): Promise<string> {
    let body = await req.text();
    const params = new URLSearchParams(body!.trim());
    if (params.has("refresh_token")) {
        const refreshToken = req.cookies.get({...refreshCookie, value: ''})?.value;
        if (refreshToken) {
            params.set("refresh_token", refreshToken);
            body = params.toString();
        }
    }
    return body;
}

/** Handles actions involving minting new ID or refresh tokens. */
export async function POST(req: NextRequest) {
    console.log("Minting tokens");
    const redirectTo = new URL(req.nextUrl.searchParams.get('finalTarget')!);
    const cookies = await getCookies(req);
    const purpose = getPurpose(redirectTo);
    console.log("Purpose is", purpose);
    if (purpose === 'invalid') {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Sign in requests are JSON requests that can be forwarded directly, but
    // refresh requests are missing a refresh token that is only present in the HTTPOnly
    // cookie. The body must be parsed and recreated to include this token.
    // We don't fail when this cookie is missing so that we are guaranteed to recreate the
    // exact error for the client SDK that it would get if it tried to refresh with local storage.
    const body = purpose === 'refresh' ? await bodyForTokenRefresh(req, cookies.refresh) : req.body;
    const headers = redactHeaders(req.headers);
    
    // Because we are sometimes piping bodies directly from one service to another, we need to
    // set duplex: 'half' in Node 18+, but old versions of the type libraries will say that this
    // field doesn't exist and error out. Using a literal const and then passing it as a parameter
    // shuts up the type error.
    const proxyRequest = { method: 'POST', body, headers, duplex: 'half' }; 
    const proxied = await fetch(redirectTo, proxyRequest);
    if (!proxied.ok) {
        // N.B. We have intentionally never touched proxied.body yet so that we can pipe raw bytes over
        // and not worry about causing a parsing exception that swallows this error.
        return new NextResponse(proxied.body, { status: proxied.status, statusText: proxied.statusText });
    }
    const json = await proxied.json();
    const refreshToken = json.refreshToken || json.refresh_token;
    const idToken = json.idToken || json.id_token;
    const maxAge = json.expiresIn || json.expires_in;

    const response = NextResponse.json(json, { status: proxied.status, statusText: proxied.statusText });
    if (idToken && idToken !== req.cookies.get({...cookies.identity, value: ''})?.value) {
        response.cookies.set({...cookies.identity, maxAge, value: idToken});
    } else {
        console.log("Not modifying ID token because it has not changed. Have",idToken);
    }
    if (refreshToken) {
        response.cookies.set({...cookies.refresh, value: refreshToken});
    }

    return response;
}
