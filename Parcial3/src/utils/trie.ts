function normalizeKey(value: string) {
  return value.trim().toLowerCase()
}

class TrieNode<T> {
  children = new Map<string, TrieNode<T>>()
  values: T[] = []
  isTerminal = false
}

export class Trie<T> {
  private readonly root = new TrieNode<T>()
  private readonly keySelector: (value: T) => string

  constructor(keySelector: (value: T) => string) {
    this.keySelector = keySelector
  }

  insert(value: T) {
    const normalizedKey = normalizeKey(this.keySelector(value))
    let currentNode = this.root

    for (const character of normalizedKey) {
      if (!currentNode.children.has(character)) {
        currentNode.children.set(character, new TrieNode<T>())
      }

      currentNode = currentNode.children.get(character)!
    }

    currentNode.isTerminal = true
    currentNode.values.push(value)
  }

  search(query: string) {
    const node = this.findNode(query)

    return Boolean(node?.isTerminal)
  }

  suggestByPrefix(prefix: string, limit = 5) {
    const node = this.findNode(prefix)

    if (!node) {
      return []
    }

    const results: T[] = []
    const seen = new Set<string>()
    const queue: TrieNode<T>[] = [node]

    while (queue.length && results.length < limit) {
      const currentNode = queue.shift()!

      if (currentNode.isTerminal) {
        for (const value of currentNode.values) {
          const valueKey = this.keySelector(value)

          if (seen.has(valueKey)) {
            continue
          }

          seen.add(valueKey)
          results.push(value)

          if (results.length >= limit) {
            break
          }
        }
      }

      for (const childNode of currentNode.children.values()) {
        queue.push(childNode)
      }
    }

    return results.sort((left, right) =>
      this.keySelector(left).localeCompare(this.keySelector(right)),
    )
  }

  private findNode(query: string) {
    const normalizedQuery = normalizeKey(query)
    let currentNode = this.root

    for (const character of normalizedQuery) {
      const nextNode = currentNode.children.get(character)

      if (!nextNode) {
        return null
      }

      currentNode = nextNode
    }

    return currentNode
  }
}