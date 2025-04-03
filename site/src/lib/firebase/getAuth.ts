import getApp from './getApp';
import { initializeAuth, connectAuthEmulator, Auth, getAuth as rawGetAuth } from '@firebase/auth';
// @ts-expect-error browserCookiePersistence does not have public types
import { browserCookiePersistence } from '@firebase/auth';

import { type FirebaseApp } from '@firebase/app';

// Workaround for HMR breaking the Firebse cache because initializeAuth is not
// currently idempotent.
const editableGlobalThis = globalThis as any as Record<string, any> & { authCache: Record<string, Auth> };
editableGlobalThis.authCache = {};

export default function getAuth(app?: FirebaseApp): Auth {
    app = app || getApp();
    if (app.name in editableGlobalThis.authCache) {
        return editableGlobalThis.authCache[app.name];
    }
    console.log("About to initialize auth");
    const auth = initializeAuth(app, { persistence: browserCookiePersistence });
    // Client-side intialization of the emulators is coming but is not avialable yet.
    if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
        console.log("Connecting to Auth emulator");
        connectAuthEmulator(auth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
    }
    editableGlobalThis.authCache[app.name] = auth;
    return auth;
}