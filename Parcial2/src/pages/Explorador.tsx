import { useMemo, useState } from 'react'
import { useAuthContext } from '../context/ContextoAuth'
import { useArbolContext } from '../context/ContextoArbol'
import ExploradorArbol from '../components/ExploradorArbol'

const Explorador = () => {
  const { user, logout } = useAuthContext()
  const {
    arbol,
    carpetaSeleccionada,
    idCarpetaSeleccionada,
    idsAbiertos,
    cargando,
    error,
    puedeCrear,
    crearCarpeta,
    crearArchivo,
    seleccionarCarpeta,
    alternarExpandido,
  } = useArbolContext()

  const [nombreCarpeta, setNombreCarpeta] = useState('')
  const [nombreArchivo, setNombreArchivo] = useState('')
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null)

  const rutaActual = useMemo(() => {
    if (!arbol || !carpetaSeleccionada) {
      return 'Root'
    }

    return carpetaSeleccionada.name
  }, [arbol, carpetaSeleccionada])

  const handleCreateFolder = async () => {
    try {
      setErrorSubmit(null)
      await crearCarpeta(nombreCarpeta, idCarpetaSeleccionada)
      setNombreCarpeta('')
    } catch (creationError) {
      setErrorSubmit((creationError as Error).message)
    }
  }

  const handleCreateFile = async () => {
    try {
      setErrorSubmit(null)
      await crearArchivo(nombreArchivo, idCarpetaSeleccionada)
      setNombreArchivo('')
    } catch (creationError) {
      setErrorSubmit((creationError as Error).message)
    }
  }

  return (
    <main className="explorer-page">
      <header className="explorer-header">
        <div>
          <p className="breadcrumb">Carpeta actual: <strong>{rutaActual}</strong></p>
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
                value={nombreCarpeta}
                onChange={(event) => setNombreCarpeta(event.target.value)}
                placeholder="Ingrese nombre de la nueva carpeta"
              />
            </label>
            <button onClick={handleCreateFolder} disabled={!puedeCrear || !nombreCarpeta.trim()}>
              Crear carpeta
            </button>
            <label>
              Nombre archivo
              <input
                type="text"
                value={nombreArchivo}
                onChange={(event) => setNombreArchivo(event.target.value)}
                placeholder="Ingrese nombre del nuevo archivo"
              />
            </label>
            <button onClick={handleCreateFile} disabled={!puedeCrear || !nombreArchivo.trim()}>
              Crear archivo
            </button>
            {errorSubmit && <p className="form-error">{errorSubmit}</p>}
            {error && <p className="form-error">{error}</p>}
          </div>
        </aside>

        <article className="explorer-content">
          <div className="card">
            <h2>Explorador</h2>
            {cargando && <p>Cargando árbol...</p>}
            {!cargando && arbol && (
              <ExploradorArbol
                raiz={arbol}
                expandedIds={idsAbiertos}
                selectedId={idCarpetaSeleccionada}
                onToggle={alternarExpandido}
                onSelect={seleccionarCarpeta}
              />
            )}
            {!cargando && !arbol && <p>No se encontro el árbol para este usuario.</p>}
          </div>
        </article>
      </section>
    </main>
  )
}

export default Explorador
