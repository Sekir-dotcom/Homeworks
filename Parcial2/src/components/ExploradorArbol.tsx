import type { NodoArbol as NodoArbolType } from '../models/arbol'
import NodoArbolComp from './NodoArbol'

type ExploradorArbolProps = {
  raiz: NodoArbolType
  expandedIds: string[]
  selectedId: string
  onToggle: (nodeId: string) => void
  onSelect: (nodeId: string) => void
}

const ExploradorArbol = ({ raiz, expandedIds, selectedId, onToggle, onSelect }: ExploradorArbolProps) => {
  return (
    <div className="tree-explorer">
      <NodoArbolComp
        nodo={raiz}
        depth={0}
        expandedIds={expandedIds}
        selectedId={selectedId}
        onToggle={onToggle}
        onSelect={onSelect}
      />
    </div>
  )
}

export default ExploradorArbol
