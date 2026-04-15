import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useCollection } from './useCollection'
import {
  addNodeToTree,
  createFolderNode,
  createFileNode,
  createRootFolder,
  findNodeById,
  ROOT_FOLDER_ID,
} from '../models/tree'
import type { FolderNode, TreeDocument } from '../models/tree'

export const useTree = () => {
  const { user } = useAuthContext()
  const [tree, setTree] = useState<FolderNode | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState(ROOT_FOLDER_ID)
  const [expandedIds, setExpandedIds] = useState<string[]>([ROOT_FOLDER_ID])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { getDocument, setDocument, listenDocument } = useCollection<TreeDocument>()

  const treeOwner = user?.email ?? ''

  const persistTree = useCallback(
    async (root: FolderNode) => {
      if (!user) {
        return
      }

      const document: TreeDocument = {
        owner: treeOwner,
        createdAt: new Date().toISOString(),
        root,
      }

      try {
        await setDocument('trees', user.uid, document)
      } catch (firestoreError) {
        setError((firestoreError as Error).message)
      }
    },
    [setDocument, treeOwner, user],
  )

  useEffect(() => {
    if (!user) {
      setTree(null)
      setLoading(false)
      return
    }

    setLoading(true)
    const unsubscribe = listenDocument('trees', user.uid, async (document) => {
      if (!document) {
        const root = createRootFolder(treeOwner || user.uid)
        setTree(root)
        await persistTree(root)
        setLoading(false)
        return
      }

      setTree(document.root)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [listenDocument, persistTree, treeOwner, user])

  const selectedFolder = useMemo(() => {
    if (!tree) {
      return null
    }

    return findNodeById(tree, selectedFolderId)
  }, [tree, selectedFolderId])

  const canCreate = Boolean(user && !loading && selectedFolder && selectedFolder.type === 'folder')

  const createFolder = useCallback(
    async (name: string, parentId: string = selectedFolderId) => {
      if (!user || !tree) {
        throw new Error('Usuario no autenticado')
      }

      if (!name.trim()) {
        throw new Error('El nombre de la carpeta no puede estar vacío')
      }

      const parent = findNodeById(tree, parentId)
      if (!parent || parent.type !== 'folder') {
        throw new Error('Solo se puede crear la carpeta dentro de otra carpeta')
      }

      const folder = createFolderNode(name.trim(), treeOwner || user.uid)
      const nextRoot = addNodeToTree(tree, parentId, folder) as FolderNode
      setTree(nextRoot)
      await persistTree(nextRoot)
      setExpandedIds((current) => Array.from(new Set([...current, parentId, folder.id])))
    },
    [persistTree, selectedFolderId, tree, treeOwner, user],
  )

  const createFile = useCallback(
    async (name: string, parentId: string = selectedFolderId) => {
      if (!user || !tree) {
        throw new Error('Usuario no autenticado')
      }

      if (!name.trim()) {
        throw new Error('El nombre del archivo no puede estar vacío')
      }

      const parent = findNodeById(tree, parentId)
      if (!parent || parent.type !== 'folder') {
        throw new Error('Solo se puede crear el archivo dentro de una carpeta')
      }

      const file = createFileNode(name.trim(), treeOwner || user.uid)
      const nextRoot = addNodeToTree(tree, parentId, file) as FolderNode
      setTree(nextRoot)
      await persistTree(nextRoot)
      setExpandedIds((current) => Array.from(new Set([...current, parentId])))
    },
    [persistTree, selectedFolderId, tree, treeOwner, user],
  )

  const selectFolder = useCallback((folderId: string) => {
    if (!tree) {
      return
    }

    const node = findNodeById(tree, folderId)
    if (node && node.type === 'folder') {
      setSelectedFolderId(folderId)
    }
  }, [tree])

  const toggleExpanded = useCallback((nodeId: string) => {
    setExpandedIds((current) =>
      current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId],
    )
  }, [])

  const refreshTree = useCallback(async () => {
    if (!user) {
      return
    }

    setLoading(true)
    const document = await getDocument('trees', user.uid)
    if (document) {
      setTree(document.root)
    }
    setLoading(false)
  }, [getDocument, user])

  return {
    tree,
    selectedFolderId,
    selectedFolder,
    expandedIds,
    loading,
    error,
    canCreate,
    createFolder,
    createFile,
    selectFolder,
    toggleExpanded,
    refreshTree,
  }
}
