import getApp from './getApp';
import { getAuth as rawGetAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { type FirebaseApp } from 'firebase/app';

let cache: Auth | null = null;
export default function getAuth(app?: FirebaseApp) {
    if (!cache) {
        app = app || getApp();
        cache = rawGetAuth(app);
        // Client-side intialization of the emulators is coming but is not avialable yet.
        if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
            console.log("CONNECTING TO AUTH EMULATOR AT", process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
            connectAuthEmulator(cache, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST);
        } else {
            console.log("CONNECTING TO PROD AUTH");
        }
    }
    return cache;
}