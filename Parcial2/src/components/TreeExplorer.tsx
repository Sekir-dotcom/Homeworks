import type { TreeNode } from '../models/tree'
import TreeNodeItem  from './TreeNodeItem'

type TreeExplorerProps = {
  root: TreeNode
  expandedIds: string[]
  selectedId: string
  onToggle: (nodeId: string) => void
  onSelect: (nodeId: string) => void
}

const TreeExplorer = ({ root, expandedIds, selectedId, onToggle, onSelect }: TreeExplorerProps) => {
  return (
    <div className="tree-explorer">
      <TreeNodeItem
        node={root}
        depth={0}
        expandedIds={expandedIds}
        selectedId={selectedId}
        onToggle={onToggle}
        onSelect={onSelect}
      />
    </div>
  )
}

export default TreeExplorer
