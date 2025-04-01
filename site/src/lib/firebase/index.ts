import { FirebaseApp, initializeApp, initializeServerApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'
import { cookies } from 'next/headers';

// Initialize Firebase
let app: FirebaseApp | null = null;

export function getApp(): FirebaseApp {
    if (!app) {
        if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
            console.debug("NEXT_PUBLIC_FIREBASE_CONFIG is missing. Going to auto-init Firebase client SDK");
            app = initializeApp();
        } else {
            app = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG));
        }
    }
    return app;
}

export async function getServerApp(): Promise<{ app: FirebaseApp, auth: Auth }> {
    "use server";
    const COOKIE_NAME = process.env.NODE_ENV === 'development' ?
    `__dev_FIREBASE_[DEFAULT]` :
    `__HOST-FIREBASE_[DEFAULT]`;

    const cookieStore = await cookies();
    const authIdToken = cookieStore.get(COOKIE_NAME)?.value;
    let app: FirebaseApp;
    if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
        console.debug("NEXT_PUBLIC_FIREBASE_CONFIG is missing. Going to auto-init Firebase client SDK");
        app = initializeServerApp({}, { authIdToken });
    } else {
        app = initializeServerApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG), { authIdToken });
    }

    const auth = getAuth(app);
    await auth.authStateReady(); // await to use auth.currentUser sync

    return {
        app,
        auth,
    };
}