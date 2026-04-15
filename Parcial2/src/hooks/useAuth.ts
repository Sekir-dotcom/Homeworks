import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../firebase/config'

export type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (authError) {
      setError((authError as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (authError) {
      setError((authError as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)

    try {
      await signOut(auth)
    } catch (authError) {
      setError((authError as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  }
}
