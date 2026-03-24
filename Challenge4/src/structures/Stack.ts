export default class Stack<T> {
    private items: T[] = [];

    push(item: T) {
    this.items.push(item);
    }

    pop(): T | undefined {
    return this.items.pop();
    }

        peek(): T | undefined {
    return this.items[this.items.length - 1];
    }

    getItems(): T[] {
    return [...this.items];
    }

    size(): number {
    return this.items.length;
    }
}