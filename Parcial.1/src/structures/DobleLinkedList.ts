class DoubleNode<T> {
  value: T;
  next: DoubleNode<T> | null = null;
  prev: DoubleNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export default class DoublyLinkedList<T> {

  head: DoubleNode<T> | null = null;
  tail: DoubleNode<T> | null = null;
  length: number = 0;

  append(value: T): void {
    const newNode = new DoubleNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;

    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    return arr;
  }
}