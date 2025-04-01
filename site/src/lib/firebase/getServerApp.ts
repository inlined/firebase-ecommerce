import { FirebaseApp, initializeServerApp } from 'firebase/app';
import getAuth from './getAuth';
import { cookies } from 'next/headers';

// Note: we are not caching because initializeServerApp already does this for us.
export default async function getServerApp(): Promise<FirebaseApp> {
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

    // Makes behavior deterministic by waiting for auth.currentUser to sync
    const auth = getAuth(app);
    await auth.authStateReady();

    return app;
}