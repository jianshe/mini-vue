// stack FILO 先进后出
export default class Stack {
  private items: any = [];
  constructor() {
    this.items = [];
  }

  push(element: any) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }
  peek() {
    // 获取栈顶元素
    return this.items.unshift();
  }
  isEmpty() {
    return this.items.length === 0;
  }

  toString() {
    return this.items.join(",");
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }
}
