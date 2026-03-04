class CircularNode<T> {
    value: T;
    next: CircularNode<T> | null = null;

    constructor(value: T) {
    this.value = value;
    }
}

export default class CircularLinkedList<T> {

    head: CircularNode<T> | null = null;
    current: CircularNode<T> | null = null;
    length: number = 0;

    append(value: T): void {
    const newNode = new CircularNode(value);

    // lista vacía
    if (!this.head) {
        this.head = newNode;
      newNode.next = newNode; // se apunta a sí mismo
        this.current = newNode;
    } else {
        let tail = this.head;

        while (tail.next !== this.head) {
        tail = tail.next!;
        }

        tail.next = newNode;
        newNode.next = this.head;
    }

    this.length++;
    }

    next(): T | null {
    if (!this.current) return null;

    this.current = this.current.next;
    return this.current!.value;
    }

    getCurrent(): T | null {
    return this.current ? this.current.value : null;
    }
}