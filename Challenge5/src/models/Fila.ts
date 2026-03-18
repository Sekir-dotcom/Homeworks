export class Fila<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    enqueue(item: T) {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    size(): number {
        return this.items.length;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    getItems(): T[] {
        return this.items;
    }
}