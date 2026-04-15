import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useTree } from '../hooks/useTree'

const TreeContext = createContext<ReturnType<typeof useTree> | undefined>(undefined)

export const TreeProvider = ({ children }: { children: ReactNode }) => {
  const tree = useTree()

  return <TreeContext.Provider value={tree}>{children}</TreeContext.Provider>
}

export const useTreeContext = () => {
  const context = useContext(TreeContext)
  if (!context) {
    throw new Error('useTreeContext debe usarse dentro de TreeProvider')
  }

  return context
}
