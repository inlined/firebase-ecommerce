"use server";

import { FirebaseApp, FirebaseServerApp, initializeServerApp } from 'firebase/app';
import getAuth from './getAuth';
import { cookies, headers } from 'next/headers';

async function getTokenFromCookie(): Promise<string | undefined> {
    const COOKIE_NAME = process.env.NODE_ENV === 'development' ?
    `__dev_FIREBASE_[DEFAULT]` :
    `__HOST-FIREBASE_[DEFAULT]`;

    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
}

async function getTokenFromHeader(): Promise<string | undefined> {
    return (await headers()).get('Authorization')?.replace('Bearer ', '');
}

// Note: we are not caching because initializeServerApp already does this for us.
export default async function getServerApp(): Promise<FirebaseApp> {
    const authIdToken = await getTokenFromCookie() || await getTokenFromHeader();
    let app: FirebaseServerApp;
    if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
        app = initializeServerApp({}, { authIdToken });
    } else {
        app = initializeServerApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG), { authIdToken });
    }

    // Makes behavior deterministic by waiting for auth.currentUser to sync
    // TODO: consider making clients who want to use auth use auth.
    const auth = getAuth(app);
    await auth.authStateReady();

    return app;
}