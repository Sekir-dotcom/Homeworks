import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useArbol } from '../hooks/useArbol'

const ArbolContext = createContext<ReturnType<typeof useArbol> | undefined>(undefined)

export const ArbolProvider = ({ children }: { children: ReactNode }) => {
  const arbol = useArbol()

  return <ArbolContext.Provider value={arbol}>{children}</ArbolContext.Provider>
}

export const useArbolContext = () => {
  const context = useContext(ArbolContext)
  if (!context) {
    throw new Error('useArbolContext debe usarse dentro de ArbolProvider')
  }

  return context
}
