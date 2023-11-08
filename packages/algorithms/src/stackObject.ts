export default class Stack {
  private _count: number;
  private _items: {};
  constructor() {
    this._count = 0;
    this._items = {};
  }
  push(element) {
    this._items[this._count] = element;
    this._count++;
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this._count--;
    const result = this._items[this._count];
    delete this._items[this._count];
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._items[this._count - 1];
  }
  clear() {
    this._items = {};
    this._count = 0;
  }
  isEmpty() {
    return this._count === 0;
  }
  size() {
    return this._count;
  }
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = this._items[0];
    for (let i = 1; i < this._count; i++) {
      objString = `${objString},${this._items[i]}`;
    }
    return objString;
  }
}
