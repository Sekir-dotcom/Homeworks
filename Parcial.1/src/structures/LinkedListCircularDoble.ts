import { Nodo } from "./nodo";

export default class CircularDoublyLinkedList<T> {

    head: Nodo<T> | null = null;
    current: Nodo<T> | null = null;

    append(value: T): void {

    const newNode = new Nodo(value);

    if (!this.head) {
        this.head = newNode;
        newNode.next = newNode;
        newNode.prev = newNode;
        this.current = newNode;
        return;
    }

    const tail = this.head.prev!;

    tail.next = newNode;
    newNode.prev = tail;

    newNode.next = this.head;
    this.head.prev = newNode;
    }

    next(): T | null {
    if (!this.current) return null;

    this.current = this.current.next!;
    return this.current.data;
    }

    prev(): T | null {
    if (!this.current) return null;

    this.current = this.current.prev!;
    return this.current.data;
    }

    getCurrent(): T | null {
    return this.current ? this.current.data : null;
    }
}