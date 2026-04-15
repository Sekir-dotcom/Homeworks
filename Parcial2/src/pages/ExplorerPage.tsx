import { useMemo, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useTreeContext } from '../context/TreeContext'
import TreeExplorer  from '../components/TreeExplorer'

const ExplorerPage = () => {
  const { user, logout } = useAuthContext()
  const {
    tree,
    selectedFolder,
    selectedFolderId,
    expandedIds,
    loading,
    error,
    canCreate,
    createFolder,
    createFile,
    selectFolder,
    toggleExpanded,
  } = useTreeContext()

  const [folderName, setFolderName] = useState('')
  const [fileName, setFileName] = useState('')
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const currentPath = useMemo(() => {
    if (!tree || !selectedFolder) {
      return 'Root'
    }

    return selectedFolder.name
  }, [tree, selectedFolder])

  const handleCreateFolder = async () => {
    try {
      setSubmissionError(null)
      await createFolder(folderName, selectedFolderId)
      setFolderName('')
    } catch (creationError) {
      setSubmissionError((creationError as Error).message)
    }
  }

  const handleCreateFile = async () => {
    try {
      setSubmissionError(null)
      await createFile(fileName, selectedFolderId)
      setFileName('')
    } catch (creationError) {
      setSubmissionError((creationError as Error).message)
    }
  }

  return (
    <main className="explorer-page">
      <header className="explorer-header">
        <div>
          <p className="breadcrumb">Carpeta actual: <strong>{currentPath}</strong></p>
          <p>Usuario: <strong>{user?.email}</strong></p>
        </div>
        <button className="button-secondary" onClick={logout}>
          Cerrar sesión
        </button>
      </header>

      <section className="explorer-grid">
        <aside className="explorer-panel">
          <div className="card">
            <h2>Acciones</h2>
            <p>Selecciona una carpeta y crea un archivo o carpeta dentro.</p>
            <label>
              Nombre carpeta
              <input
                type="text"
                value={folderName}
                onChange={(event) => setFolderName(event.target.value)}
                placeholder="Ingrese nombre de la nueva carpeta"
              />
            </label>
            <button onClick={handleCreateFolder} disabled={!canCreate || !folderName.trim()}>
              Crear carpeta
            </button>
            <label>
              Nombre archivo
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                placeholder="Ingrese nombre del nuevo archivo"
              />
            </label>
            <button onClick={handleCreateFile} disabled={!canCreate || !fileName.trim()}>
              Crear archivo
            </button>
            {submissionError && <p className="form-error">{submissionError}</p>}
            {error && <p className="form-error">{error}</p>}
          </div>
        </aside>

        <article className="explorer-content">
          <div className="card">
            <h2>Explorador</h2>
            {loading && <p>Cargando árbol...</p>}
            {!loading && tree && (
              <TreeExplorer
                root={tree}
                expandedIds={expandedIds}
                selectedId={selectedFolderId}
                onToggle={toggleExpanded}
                onSelect={selectFolder}
              />
            )}
            {!loading && !tree && <p>No se encontró el árbol para este usuario.</p>}
          </div>
        </article>
      </section>
    </main>
  )
}

export default ExplorerPage
