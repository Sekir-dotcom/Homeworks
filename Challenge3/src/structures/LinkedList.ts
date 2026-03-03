class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
    this.value = value;
    this.next = null;
    }
}

class LinkedList<T> {
    head: Node<T> | null;
    tail: Node<T> | null;
    length: number;

    constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    }

    append(value: T) {
    const newNode = new Node(value);

    if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail!.next = newNode;
        this.tail = newNode;
    }

    this.length++;
    }

    getHead() {
    return this.head;
    }
}

export default LinkedList;