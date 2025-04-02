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


async function canHandSecure(req: NextRequest) {
   if (req.nextUrl.protocol === "https") {
    return true;
   }
   const userAgent = (await headers()).get('User-Agent');
   return userAgent && (!userAgent?.includes('Safari') || userAgent.includes("Chrome"));
}

async function getCookies(): Promise<{ identity: Cookie, refresh: Cookie }> {
    throw "TBD";
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

export async function POST(req: NextRequest) {
    console.log("GOT REQUEST TO __COOKIES__", JSON.stringify({
        url: req.url,
        query: req.nextUrl.searchParams,
        headers: [...req.headers.values()],
        body: await req.json(),
    }));
    return NextResponse.json({hi: "there"});
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