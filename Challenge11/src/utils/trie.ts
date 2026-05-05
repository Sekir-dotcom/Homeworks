import { MinHeap } from './heap'

export type Product = {
  name: string
  popularity: number
}

class TrieNode {
  children = new Map<string, TrieNode>()
  product: Product | null = null
}

export class Trie {
  private root = new TrieNode()

  insert(name: string, popularity: number) {
    const key = name.trim().toLowerCase()
    if (!key) return

    let node = this.root
    for (const char of key) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode())
      }
      node = node.children.get(char)! 
    }

    node.product = { name, popularity }
  }

  searchByPrefix(prefix: string) {
    const key = prefix.trim().toLowerCase()
    let node = this.root

    for (const char of key) {
      const child = node.children.get(char)
      if (!child) {
        return []
      }
      node = child
    }

    return this.collectProducts(node)
  }

  private collectProducts(node: TrieNode) {
    const products: Product[] = []
    if (node.product) {
      products.push(node.product)
    }

    for (const child of node.children.values()) {
      products.push(...this.collectProducts(child))
    }

    return products
  }

  searchTopK(prefix: string, k: number) {
    const products = this.searchByPrefix(prefix)
    if (products.length <= k) {
      return products.sort((a, b) => b.popularity - a.popularity)
    }

    const heap = new MinHeap<Product>((a, b) => a.popularity - b.popularity)
    for (const product of products) {
      if (heap.size() < k) {
        heap.push(product)
        continue
      }

      const smallest = heap.peek()
      if (smallest && product.popularity > smallest.popularity) {
        heap.pop()
        heap.push(product)
      }
    }

    const result: Product[] = []
    while (heap.size() > 0) {
      result.push(heap.pop()!)
    }

    return result.sort((a, b) => b.popularity - a.popularity)
  }
}
