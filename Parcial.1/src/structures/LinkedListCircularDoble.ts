class CDNode<T> {
    value: T;
    next: CDNode<T> | null = null;
    prev: CDNode<T> | null = null;

    constructor(value: T) {
    this.value = value;
    }
}

export default class CircularDoublyLinkedList<T> {

    head: CDNode<T> | null = null;
    length: number = 0;

    append(value: T): void {
    const newNode = new CDNode(value);

    if (!this.head) {
        this.head = newNode;
        newNode.next = newNode;
        newNode.prev = newNode;
    } else {
        const tail = this.head.prev!;

        tail.next = newNode;
        newNode.prev = tail;

        newNode.next = this.head;
        this.head.prev = newNode;
    }

    this.length++;
    }

    toArray(): T[] {
    const arr: T[] = [];

    if (!this.head) return arr;

    let current = this.head;

    do {
        arr.push(current.value);
        current = current.next!;
    } while (current !== this.head);

    return arr;
    }
}