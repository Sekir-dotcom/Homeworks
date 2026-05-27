type ScoreEntry = {
  songId: string
  score: number
}

export class UndirectedGraph<TNode extends string> {
  private readonly adjacency = new Map<TNode, Set<TNode>>()

  addNode(node: TNode) {
    if (!this.adjacency.has(node)) {
      this.adjacency.set(node, new Set<TNode>())
    }
  }

  addEdge(leftNode: TNode, rightNode: TNode) {
    if (leftNode === rightNode) {
      return
    }

    this.addNode(leftNode)
    this.addNode(rightNode)

    this.adjacency.get(leftNode)!.add(rightNode)
    this.adjacency.get(rightNode)!.add(leftNode)
  }

  getNeighbors(node: TNode) {
    return Array.from(this.adjacency.get(node) ?? [])
  }

  recommend<TSong extends { id: string; title: string; plays: number }>(
    node: TNode,
    songsById: Map<string, TSong>,
    limit = 5,
  ) {
    const directNeighbors = this.getNeighbors(node)
    const scores = new Map<string, number>()

    directNeighbors.forEach((neighborId) => {
      scores.set(neighborId, (scores.get(neighborId) ?? 0) + 3)

      this.getNeighbors(neighborId).forEach((secondaryNeighborId) => {
        if (secondaryNeighborId === node) {
          return
        }

        scores.set(secondaryNeighborId, (scores.get(secondaryNeighborId) ?? 0) + 1)
      })
    })

    const sortedScores: ScoreEntry[] = Array.from(scores.entries())
      .filter(([songId]) => songsById.has(songId))
      .map(([songId, score]) => ({ songId, score }))
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score
        }

        const leftSong = songsById.get(left.songId)!
        const rightSong = songsById.get(right.songId)!

        if (rightSong.plays !== leftSong.plays) {
          return rightSong.plays - leftSong.plays
        }

        return leftSong.title.localeCompare(rightSong.title)
      })

    return sortedScores.slice(0, limit).map(({ songId }) => songsById.get(songId)!)
  }
}