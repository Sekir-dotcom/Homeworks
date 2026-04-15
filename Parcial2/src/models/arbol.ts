export type ArchivoNodo = {
  id: string
  name: string
  type: 'file'
  createdBy: string
  children?: undefined
}

export type CarpetaNodo = {
  id: string
  name: string
  type: 'folder'
  createdBy: string
  children: NodoArbol[]
}

export type NodoArbol = ArchivoNodo | CarpetaNodo

export type DocumentoArbol = {
  raiz: CarpetaNodo
  owner: string
  creadoEn: string
}

export const ID_CARPETA_RAIZ = 'root'

export const crearCarpetaBase = (createdBy: string): CarpetaNodo => ({
  id: ID_CARPETA_RAIZ,
  name: 'Root',
  type: 'folder',
  createdBy,
  children: [],
})

export const crearNodoCarpeta = (name: string, createdBy: string): CarpetaNodo => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name,
  type: 'folder',
  createdBy,
  children: [],
})

export const crearNodoArchivo = (name: string, createdBy: string): ArchivoNodo => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name,
  type: 'file',
  createdBy,
})

export const esCarpetaNodo = (node: NodoArbol): node is CarpetaNodo => node.type === 'folder'

export const buscarNodoPorId = (node: NodoArbol, searchId: string): NodoArbol | null => {
  if (node.id === searchId) {
    return node
  }

  if (esCarpetaNodo(node)) {
    for (const child of node.children) {
      const found = buscarNodoPorId(child, searchId)
      if (found) {
        return found
      }
    }
  }

  return null
}

export const agregarNodoAlArbol = (root: NodoArbol, parentId: string, newNode: NodoArbol): NodoArbol => {
  if (root.id === parentId) {
    if (!esCarpetaNodo(root)) {
      throw new Error('No se puede agregar hijos a un archivo')
    }

    return {
      ...root,
      children: [...root.children, newNode],
    }
  }

  if (!esCarpetaNodo(root)) {
    return root
  }

  return {
    ...root,
    children: root.children.map((child) => agregarNodoAlArbol(child, parentId, newNode)),
  }
}
