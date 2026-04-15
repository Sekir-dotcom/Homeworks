import { useCallback } from 'react'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase/configFirebase'

export const useColeccion = <T extends Record<string, unknown> = Record<string, unknown>>() => {
  const getDocument = useCallback(
    async (collectionName: string, documentId: string): Promise<T | null> => {
      const reference = doc(db, collectionName, documentId)
      const snapshot = await getDoc(reference)

      if (!snapshot.exists()) {
        return null
      }

      return snapshot.data() as T
    },
    [],
  )

  const setDocument = useCallback(
    async (collectionName: string, documentId: string, document: T): Promise<void> => {
      const reference = doc(db, collectionName, documentId)
      await setDoc(reference, document, { merge: true })
    },
    [],
  )

  const listenDocument = useCallback(
    (
      collectionName: string,
      documentId: string,
      callback: (document: T | null) => void,
    ) => {
      const reference = doc(db, collectionName, documentId)
      return onSnapshot(reference, (snapshot) => {
        callback(snapshot.exists() ? (snapshot.data() as T) : null)
      })
    },
    [],
  )

  return {
    getDocument,
    setDocument,
    listenDocument,
  }
}
