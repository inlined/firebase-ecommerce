import { connectAuthEmulator, Auth, getAuth as rawGetAuth } from '@firebase/auth';

import { type FirebaseApp } from '@firebase/app';

export default function getAuth(app: FirebaseApp): Auth {
    const auth = rawGetAuth(app);
    if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
        if (!auth.emulatorConfig) {
            connectAuthEmulator(auth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
        }
    }
    return auth;
}