import { Nodo } from "./nodo";

export default class LinkedList<T> {

    head: Nodo<T> | null = null;
    tail: Nodo<T> | null = null;
    length: number = 0;

    append(value: T): void {
    const newNode = new Nodo(value);

    if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
    } else {
        this.tail!.next = newNode;
        this.tail = newNode;
    }

    this.length++;
    }

    removeFirst(): T | null {
    if (!this.head) return null;

    const removed = this.head;
    this.head = this.head.next;

    if (!this.head) {
        this.tail = null;
    }

    this.length--;
    return removed.data; // ✅ CAMBIO
    }

    toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;

    while (current) {
      arr.push(current.data); // ✅ CAMBIO
        current = current.next;
    }

    return arr;
    }
}
