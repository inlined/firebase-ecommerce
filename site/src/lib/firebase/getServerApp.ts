"use server";

import { FirebaseApp, initializeServerApp } from '@firebase/app';
import { cookies, headers } from 'next/headers';

async function getAuthTokenFromCookie(): Promise<string | undefined> {
    const COOKIE_NAME = process.env.NODE_ENV === 'development' ?
    `__dev_FIREBASE_[DEFAULT]` :
    `__HOST-FIREBASE_[DEFAULT]`;

    const cookieStore = await cookies();
    if (cookieStore.has(COOKIE_NAME)) {
        console.log("Got credentials for serverApp from cookie:", await cookieStore.get(COOKIE_NAME)?.value);
    }
    return cookieStore.get(COOKIE_NAME)?.value;
}

async function getAuthTokenFromHeader(): Promise<string | undefined> {
    const header = (await headers()).get('authorization')?.replace(/([Bb]earer\s+)/, '');
    if (header) {
        console.log("Got credentials for serverApp from header");
        return header.replace(/(Bearer\s+)/, '')
    }
}

export async function getAuthToken(): Promise<string | undefined> {
    const [cookie, header] = await Promise.all([
        getAuthTokenFromCookie(),
        getAuthTokenFromHeader()
    ]);
    const token = cookie || header;
    return token;
}

// Note: we are not caching because initializeServerApp already does this for us.
export default async function getServerApp(): Promise<FirebaseApp> {
    const authIdToken = await getAuthToken();
    console.log("server app is", authIdToken ? "authenticated" : "unauthenticated");
    const config = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
      ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
      : process.env.FIREBASE_CONFIG
      ? JSON.parse(process.env.FIREBASE_CONFIG)
      : {};
    console.log("Creating server app. CONFIG IS", config);
    console.log("FIREBASE_CONFIG IS", process.env.FIREBASE_CONFIG);
    console.log("NEXT_PUBLIC_FIREBASE_CONFIG IS", process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
    return initializeServerApp(config, { authIdToken });
}