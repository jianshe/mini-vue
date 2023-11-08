export class Node<K> {
  left: Node<K> | undefined;
  right: Node<K> | undefined;
  constructor(public key: K) {}

  toString() {
    return `${this.key}`;
  }
}
