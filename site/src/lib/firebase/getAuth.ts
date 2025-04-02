import getApp from './getApp';
import { initializeAuth, connectAuthEmulator, Auth, getAuth as rawGetAuth } from 'firebase/auth';
// @ts-expect-error browserCookiePersistence does not have public types
import { browserCookiePersistence } from 'firebase/auth';

import { type FirebaseApp } from 'firebase/app';

export default function getAuth(app?: FirebaseApp): Auth {
    app = app || getApp();
    let auth = rawGetAuth(app);
    if (auth) {
        return auth;
    }
    auth = initializeAuth(app, { persistence: browserCookiePersistence });
    // Client-side intialization of the emulators is coming but is not avialable yet.
    if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
        console.log("Connecting to Auth emulator");
        connectAuthEmulator(auth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
    }
    return auth;
}