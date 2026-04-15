import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../context/ContextoAuth'
import { useColeccion } from './useColeccion'
import {
  agregarNodoAlArbol,
  crearCarpetaBase,
  crearNodoCarpeta,
  crearNodoArchivo,
  buscarNodoPorId,
  ID_CARPETA_RAIZ,
} from '../models/arbol'
import type { CarpetaNodo, DocumentoArbol } from '../models/arbol'

export const useArbol = () => {
  const { user } = useAuthContext()
  const [arbol, setArbol] = useState<CarpetaNodo | null>(null)
  const [idCarpetaSeleccionada, setIdCarpetaSeleccionada] = useState(ID_CARPETA_RAIZ)
  const [idsAbiertos, setIdsAbiertos] = useState<string[]>([ID_CARPETA_RAIZ])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { getDocument, setDocument, listenDocument } = useColeccion<DocumentoArbol>()

  const ownerArbol = user?.email ?? ''

  const persistirArbol = useCallback(
    async (raiz: CarpetaNodo) => {
      if (!user) {
        return
      }

      const documento: DocumentoArbol = {
        owner: ownerArbol,
        creadoEn: new Date().toISOString(),
        raiz,
      }

      try {
        await setDocument('trees', user.uid, documento)
      } catch (firestoreError) {
        setError((firestoreError as Error).message)
      }
    },
    [setDocument, ownerArbol, user],
  )

  useEffect(() => {
    if (!user) {
      setArbol(null)
      setCargando(false)
      return
    }

    setCargando(true)
    const unsubscribe = listenDocument('trees', user.uid, async (document) => {
      if (!document) {
        const raiz = crearCarpetaBase(ownerArbol || user.uid)
        setArbol(raiz)
        await persistirArbol(raiz)
        setCargando(false)
        return
      }

      setArbol(document.raiz)
      setCargando(false)
    })

    return () => unsubscribe()
  }, [listenDocument, persistirArbol, ownerArbol, user])

  const carpetaSeleccionada = useMemo(() => {
    if (!arbol) {
      return null
    }

    return buscarNodoPorId(arbol, idCarpetaSeleccionada)
  }, [arbol, idCarpetaSeleccionada])

  const puedeCrear = Boolean(user && !cargando && carpetaSeleccionada && carpetaSeleccionada.type === 'folder')

  const crearCarpeta = useCallback(
    async (nombre: string, parentId: string = idCarpetaSeleccionada) => {
      if (!user || !arbol) {
        throw new Error('Usuario no autenticado')
      }

      if (!nombre.trim()) {
        throw new Error('El nombre de la carpeta no puede estar vacío')
      }

      const parent = buscarNodoPorId(arbol, parentId)
      if (!parent || parent.type !== 'folder') {
        throw new Error('Solo se puede crear la carpeta dentro de otra carpeta')
      }

      const carpeta = crearNodoCarpeta(nombre.trim(), ownerArbol || user.uid)
      const nextRoot = agregarNodoAlArbol(arbol, parentId, carpeta) as CarpetaNodo
      setArbol(nextRoot)
      await persistirArbol(nextRoot)
      setIdsAbiertos((current) => Array.from(new Set([...current, parentId, carpeta.id])))
    },
    [persistirArbol, idCarpetaSeleccionada, arbol, ownerArbol, user],
  )

  const crearArchivo = useCallback(
    async (nombre: string, parentId: string = idCarpetaSeleccionada) => {
      if (!user || !arbol) {
        throw new Error('Usuario no autenticado')
      }

      if (!nombre.trim()) {
        throw new Error('El nombre del archivo no puede estar vacío')
      }

      const parent = buscarNodoPorId(arbol, parentId)
      if (!parent || parent.type !== 'folder') {
        throw new Error('Solo se puede crear el archivo dentro de una carpeta')
      }

      const archivo = crearNodoArchivo(nombre.trim(), ownerArbol || user.uid)
      const nextRoot = agregarNodoAlArbol(arbol, parentId, archivo) as CarpetaNodo
      setArbol(nextRoot)
      await persistirArbol(nextRoot)
      setIdsAbiertos((current) => Array.from(new Set([...current, parentId])))
    },
    [persistirArbol, idCarpetaSeleccionada, arbol, ownerArbol, user],
  )

  const seleccionarCarpeta = useCallback((folderId: string) => {
    if (!arbol) {
      return
    }

    const node = buscarNodoPorId(arbol, folderId)
    if (node && node.type === 'folder') {
      setIdCarpetaSeleccionada(folderId)
    }
  }, [arbol])

  const alternarExpandido = useCallback((nodeId: string) => {
    setIdsAbiertos((current) =>
      current.includes(nodeId) ? current.filter((id) => id !== nodeId) : [...current, nodeId],
    )
  }, [])

  const refreshTree = useCallback(async () => {
    if (!user) {
      return
    }

    setCargando(true)
    const document = await getDocument('trees', user.uid)
    if (document) {
      setArbol(document.raiz)
    }
    setCargando(false)
  }, [getDocument, user])

  return {
    arbol,
    idCarpetaSeleccionada,
    carpetaSeleccionada,
    idsAbiertos,
    cargando,
    error,
    puedeCrear,
    crearCarpeta,
    crearArchivo,
    seleccionarCarpeta,
    alternarExpandido,
    refreshTree,
  }
}
