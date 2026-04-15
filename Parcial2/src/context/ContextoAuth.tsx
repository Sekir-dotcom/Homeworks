import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useAutenticacion } from '../hooks/useAutenticacion'

const AuthContext = createContext<ReturnType<typeof useAutenticacion> | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAutenticacion()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  }

  return context
}
