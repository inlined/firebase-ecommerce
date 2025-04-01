import { FirebaseApp, initializeApp, initializeServerApp } from 'firebase/app'

// Initialize Firebase
let app: FirebaseApp | null = null;
export default function getApp(): FirebaseApp {
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

