import getApp from './getApp';
import { initializeAuth, connectAuthEmulator, Auth } from 'firebase/auth';
// @ts-expect-error browserCookiePersistence does not have public types
import { browserCookiePersistence } from 'firebase/auth';

import { type FirebaseApp } from 'firebase/app';

let auth: Auth | null = null;
export default function getAuth(app?: FirebaseApp) {
    if (!auth) {
        app = app || getApp();
        auth = initializeAuth(app, { persistence: browserCookiePersistence });
        // Client-side intialization of the emulators is coming but is not avialable yet.
        if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
            connectAuthEmulator(auth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
        }
    }
    return auth;
}