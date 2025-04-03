import { FirebaseApp, initializeApp, getApp as getExistingApp } from '@firebase/app'

// N.B. Next.js hot reloading conflicts with Firebase's
// caches so it's best to just brute force Firebase's cache rather than
// maintaining our own that might get out of sync.
export default function getApp(): FirebaseApp {
    try {
        return getExistingApp();
    } catch {
        if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
            console.debug("NEXT_PUBLIC_FIREBASE_CONFIG is missing. Going to auto-init Firebase client SDK");
            return initializeApp();
        } else {
            return initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG));
        }

    }
}

