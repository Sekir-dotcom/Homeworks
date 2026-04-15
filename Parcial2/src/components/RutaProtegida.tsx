import { type ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/ContextoAuth'

const RutaProtegida = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <p className="route-loading">Verificando autenticación...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RutaProtegida
