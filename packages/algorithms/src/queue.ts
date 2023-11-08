export default class Queue<T> {
  private _count: number;
  private _mixPopNumber: number;
  private _items: {};
  // FIFO 先进先出
  constructor() {
    this._count = 0;
    this._mixPopNumber = 0;
    this._items = {};
  }
  // 入队
  enQueue(element) {
    this._items[this._count] = element;
    this._count++;
  }
  deQueue() {
    if (this.isEmpty()) {
      return undefined;
    }
    this._count--;
    const result = this._items[this._mixPopNumber];
    delete this._items[this._mixPopNumber];
    this._mixPopNumber++;
    return result;
  } //出队
  isEmpty() {
    return this._count === 0;
  }
  clear() {
    this._count = 0;
    this._items = {};
    this._mixPopNumber = 0;
  }
  size() {
    return this._count - this._mixPopNumber;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._items[this._mixPopNumber];
  } // 返回队列中的第一个元素--最先被添加，也将是最先被移除的元素
  toObjString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this._items[this._mixPopNumber]}`;
    for (let i = this._mixPopNumber + 1; i < this._count; i++) {
      objString = `${objString},${this._items[i]}`;
    }
    return objString;
  }
}
