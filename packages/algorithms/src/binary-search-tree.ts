export default class Stack {
  private _count: number;
  private _items: {};

  constructor() {
    this._count = 0;
    this._items = {};
  }

  push(element: any) {
    this._items[this._count] = element;
    this._count++;
  }
  pop() {
    delete this._items[this._count];
    this._count--;
  }
  peek() {
    return this._items[this._count - 1];
  }
  size() {
    return this._count;
  }
  isEmpty() {
    return this._count === 0;
  }
  clear() {
    this._items = {};
    this._count = 0;
  }
  toString() {
    let toStringStr = this._items[0];
    for (let i = 1; i < this._count; i++) {
      toStringStr = `${toStringStr},${this._items[i]}`;
    }
    return toStringStr
  }
}
