export type Comparator<T> = (a: T, b: T) => number

export class MinHeap<T> {
  private items: T[] = []
  private comparator: Comparator<T>

  constructor(comparator: Comparator<T>) {
    this.comparator = comparator
  }

  size() {
    return this.items.length
  }

  peek() {
    return this.items[0]
  }

  push(item: T) {
    this.items.push(item)
    this.bubbleUp()
  }

  pop() {
    const first = this.items[0]
    const last = this.items.pop()
    if (this.items.length > 0 && last !== undefined) {
      this.items[0] = last
      this.bubbleDown()
    }
    return first
  }

  private bubbleUp() {
    let index = this.items.length - 1
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (this.comparator(this.items[index], this.items[parentIndex]) >= 0) {
        break
      }
      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  private bubbleDown() {
    let index = 0
    const length = this.items.length

    while (true) {
      const left = 2 * index + 1
      const right = left + 1
      let smallest = index

      if (left < length && this.comparator(this.items[left], this.items[smallest]) < 0) {
        smallest = left
      }
      if (right < length && this.comparator(this.items[right], this.items[smallest]) < 0) {
        smallest = right
      }
      if (smallest === index) {
        break
      }
      this.swap(index, smallest)
      index = smallest
    }
  }

  private swap(a: number, b: number) {
    const temp = this.items[a]
    this.items[a] = this.items[b]
    this.items[b] = temp
  }
}
