import { esCarpetaNodo } from '../models/arbol'
import type { NodoArbol } from '../models/arbol'

type NodoArbolProps = {
  nodo: NodoArbol
  depth: number
  expandedIds: string[]
  selectedId: string
  onToggle: (nodeId: string) => void
  onSelect: (nodeId: string) => void
}

const NodoArbolComp = ({ nodo, depth, expandedIds, selectedId, onToggle, onSelect }: NodoArbolProps) => {
  const esCarpeta = esCarpetaNodo(nodo)
  const isExpanded = expandedIds.includes(nodo.id)
  const isSelected = selectedId === nodo.id

  const handleClick = () => {
    onSelect(nodo.id)
  }

  return (
    <div className={`tree-node ${isSelected ? 'selected' : ''}`} style={{ paddingLeft: `${depth * 18}px` }}>
      <div className="tree-node-row" onClick={handleClick}>
        {esCarpeta ? (
          <button
            type="button"
            className="toggle-button"
            onClick={(event) => {
              event.stopPropagation()
              onToggle(nodo.id)
            }}
          >
            {isExpanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className="file-icon">•</span>
        )}
        <span className="tree-node-name">{nodo.name}</span>
        <span className="tree-node-meta">{nodo.type}</span>
      </div>

      <div className="tree-node-details">
        <small>Creado por: {nodo.createdBy}</small>
      </div>

      {esCarpeta && isExpanded && (
        <div className="tree-node-children">
          {nodo.children.map((hijo) => (
            <NodoArbolComp
              key={hijo.id}
              nodo={hijo}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NodoArbolComp
