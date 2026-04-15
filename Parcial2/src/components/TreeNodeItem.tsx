import { isFolderNode } from '../models/tree'
import type { TreeNode } from '../models/tree'

type TreeNodeItemProps = {
  node: TreeNode
  depth: number
  expandedIds: string[]
  selectedId: string
  onToggle: (nodeId: string) => void
  onSelect: (nodeId: string) => void
}

const TreeNodeItem = ({ node, depth, expandedIds, selectedId, onToggle, onSelect }: TreeNodeItemProps) => {
  const isFolder = isFolderNode(node)
  const isExpanded = expandedIds.includes(node.id)
  const isSelected = selectedId === node.id

  const handleTitleClick = () => {
    onSelect(node.id)
  }

  return (
    <div className={`tree-node ${isSelected ? 'selected' : ''}`} style={{ paddingLeft: `${depth * 18}px` }}>
      <div className="tree-node-row" onClick={handleTitleClick}>
        {isFolder ? (
          <button
            type="button"
            className="toggle-button"
            onClick={(event) => {
              event.stopPropagation()
              onToggle(node.id)
            }}
          >
            {isExpanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className="file-icon">•</span>
        )}
        <span className="tree-node-name">{node.name}</span>
        <span className="tree-node-meta">{node.type}</span>
      </div>

      <div className="tree-node-details">
        <small>Creado por: {node.createdBy}</small>
      </div>

      {isFolder && isExpanded && (
        <div className="tree-node-children">
          {node.children.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
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

export default TreeNodeItem
