class DoubleNode<T> {
    value: T;
    next: DoubleNode<T> | null;
    prev: DoubleNode<T> | null;

    constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
    }
}

class DoublyLinkedList<T> {
    head: DoubleNode<T> | null;
    tail: DoubleNode<T> | null;

    constructor() {
    this.head = null;
    this.tail = null;
    }

    append(value: T) {
    const newNode = new DoubleNode(value);

    if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        newNode.prev = this.tail;
        this.tail!.next = newNode;
        this.tail = newNode;
    }
    }

    getHead() {
    return this.head;
    }
}

export default DoublyLinkedList;