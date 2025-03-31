"use server";

import { connectorConfig } from '@firebasegen/default-connector'
import { getDataConnect } from 'firebase/data-connect'
import { initializeServerApp } from 'firebase/app';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase/auth';

export async function getServerObjects() {
    const COOKIE_NAME = process.env.NODE_ENV === 'development' ?
    `__dev_FIREBASE_[DEFAULT]` :
    `__HOST-FIREBASE_[DEFAULT]`;

    const cookieStore = await cookies();
    const authIdToken = cookieStore.get(COOKIE_NAME)?.value;
    const app = initializeServerApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!), { authIdToken });
    const auth = getAuth(app);

    // firebase auth should be logging in

    await auth.authStateReady(); // await to use auth.currentUser sync

    return {
        app,
        auth,
        fdc: getDataConnect(app, connectorConfig),
    };
}

