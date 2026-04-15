export type FileNode = {
  id: string
  name: string
  type: 'file'
  createdBy: string
  children?: undefined
}

export type FolderNode = {
  id: string
  name: string
  type: 'folder'
  createdBy: string
  children: TreeNode[]
}

export type TreeNode = FileNode | FolderNode

export type TreeDocument = {
  root: FolderNode
  owner: string
  createdAt: string
}

export const ROOT_FOLDER_ID = 'root'

export const createRootFolder = (createdBy: string): FolderNode => ({
  id: ROOT_FOLDER_ID,
  name: 'Root',
  type: 'folder',
  createdBy,
  children: [],
})

export const createFolderNode = (name: string, createdBy: string): FolderNode => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name,
  type: 'folder',
  createdBy,
  children: [],
})

export const createFileNode = (name: string, createdBy: string): FileNode => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name,
  type: 'file',
  createdBy,
})

export const isFolderNode = (node: TreeNode): node is FolderNode => node.type === 'folder'

export const findNodeById = (node: TreeNode, searchId: string): TreeNode | null => {
  if (node.id === searchId) {
    return node
  }

  if (isFolderNode(node)) {
    for (const child of node.children) {
      const found = findNodeById(child, searchId)
      if (found) {
        return found
      }
    }
  }

  return null
}

export const addNodeToTree = (root: TreeNode, parentId: string, newNode: TreeNode): TreeNode => {
  if (root.id === parentId) {
    if (!isFolderNode(root)) {
      throw new Error('No se puede agregar hijos a un archivo')
    }

    return {
      ...root,
      children: [...root.children, newNode],
    }
  }

  if (!isFolderNode(root)) {
    return root
  }

  return {
    ...root,
    children: root.children.map((child) => addNodeToTree(child, parentId, newNode)),
  }
}
