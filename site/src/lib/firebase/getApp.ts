import { FirebaseApp, initializeApp, getApp as getExistingApp } from '@firebase/app'

// N.B. Next.js hot reloading conflicts with Firebase's
// caches so it's best to just brute force Firebase's cache rather than
// maintaining our own that might get out of sync.
// TODO: Fall back to FIREBASE_CONFIG when it is injected
export default function getApp(): FirebaseApp {
    if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
       throw new Error("NEXT_PUBLIC_FIREBASE_CONFIG is missing. Going to auto-init Firebase client SDK");
    }
    return initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG));
}

