import { useState, useEffect } from 'react'
import { type User } from '@firebase/auth'
import getAuth from '@/lib/firebase/getAuth'
import getApp from '@/lib/firebase/getApp'
import { deleteCookie, setCookie } from 'cookies-next'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const auth = getAuth(getApp())

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user)
        setLoading(false)
      },
      (error) => {
        setError(error)
        setLoading(false)
      }
    )

    const cookieName = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST
      ? '__dev_FIREBASE_[DEFAULT]'
      : '__HOST-FIREBASE_[DEFAULT]';
    auth.onIdTokenChanged(async (user) => {
        if (user) {
            const idToken = await user.getIdToken();
            setCookie(cookieName, idToken, { secure: true, path: '/' });
            console.log("Setting cookie");
        } else {
            deleteCookie(cookieName);
            console.log("Deleting cookie");
        }
    });

    return () => unsubscribe()
  }, [])

  return { auth, user, loading, error }
}
