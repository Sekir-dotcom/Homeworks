export class Nodo<T> {
  data: T;
  next: Nodo<T> | null = null;
  prev: Nodo<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}