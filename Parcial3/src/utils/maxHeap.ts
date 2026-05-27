export class MaxHeap<T> {
  private values: T[] = []
  private readonly compare: (left: T, right: T) => number

  constructor(compare: (left: T, right: T) => number) {
    this.compare = compare
  }

  get size() {
    return this.values.length
  }

  push(value: T) {
    this.values.push(value)
    this.bubbleUp(this.values.length - 1)
  }

  pop() {
    if (!this.values.length) {
      return undefined
    }

    const topValue = this.values[0]
    const lastValue = this.values.pop()!

    if (this.values.length) {
      this.values[0] = lastValue
      this.bubbleDown(0)
    }

    return topValue
  }

  peek() {
    return this.values[0]
  }

  toSortedArray() {
    const clone = new MaxHeap<T>(this.compare)
    clone.values = [...this.values]

    const results: T[] = []

    while (clone.size > 0) {
      const nextValue = clone.pop()

      if (nextValue) {
        results.push(nextValue)
      }
    }

    return results
  }

  private bubbleUp(index: number) {
    let currentIndex = index

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2)

      if (this.compare(this.values[currentIndex], this.values[parentIndex]) <= 0) {
        break
      }

      this.swap(currentIndex, parentIndex)
      currentIndex = parentIndex
    }
  }

  private bubbleDown(index: number) {
    let currentIndex = index

    while (true) {
      const leftChildIndex = currentIndex * 2 + 1
      const rightChildIndex = currentIndex * 2 + 2
      let largestIndex = currentIndex

      if (
        leftChildIndex < this.values.length &&
        this.compare(this.values[leftChildIndex], this.values[largestIndex]) > 0
      ) {
        largestIndex = leftChildIndex
      }

      if (
        rightChildIndex < this.values.length &&
        this.compare(this.values[rightChildIndex], this.values[largestIndex]) > 0
      ) {
        largestIndex = rightChildIndex
      }

      if (largestIndex === currentIndex) {
        break
      }

      this.swap(currentIndex, largestIndex)
      currentIndex = largestIndex
    }
  }

  private swap(leftIndex: number, rightIndex: number) {
    ;[this.values[leftIndex], this.values[rightIndex]] = [
      this.values[rightIndex],
      this.values[leftIndex],
    ]
  }
}