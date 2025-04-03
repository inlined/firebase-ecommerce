import { useState, useEffect } from 'react'
import { type User } from '@firebase/auth'
import getAuth from '@/lib/firebase/getAuth'
import getApp from '@/lib/firebase/getApp'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const unsubscribe = getAuth(getApp()).onAuthStateChanged(
      (user) => {
        setUser(user)
        setLoading(false)
      },
      (error) => {
        setError(error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { user, loading, error }
}
