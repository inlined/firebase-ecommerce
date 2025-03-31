import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Initialize Firebase
const app = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG!));

// Initialize Firebase Auth and export it
export const auth = getAuth(app)
export { app as firebaseApp }
