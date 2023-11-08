import Deque from "../src/deque";

describe("deque", () => {
  let deque: Deque;

  beforeEach(() => {
    deque = new Deque();
  });

  it("starts empty", () => {
    expect(deque.size()).equal(0);
    expect(deque.isEmpty()).equal(true);
  });

  it("add elements in the back", () => {
    deque.addBack(1);
    expect(deque.size()).equal(1);

    deque.addBack(2);
    expect(deque.size()).equal(2);

    deque.addBack(3);
    expect(deque.size()).equal(3);
  });

  it("add elements in the front", () => {
    deque.addFront(1);
    expect(deque.size()).equal(1);

    deque.addFront(2);
    expect(deque.size()).equal(2);

    deque.addFront(3);
    expect(deque.size()).equal(3);

    deque.removeFront();
    deque.addFront(4);
    expect(deque.size()).equal(3);
  });

  it("remove elements from the back", () => {
    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);

    expect(deque.removeBack()).equal(3);
    expect(deque.removeBack()).equal(2);
    expect(deque.removeBack()).equal(1);
    expect(deque.removeBack()).equal(0);
    expect(deque.removeBack()).equal(undefined);
  });

  it("remove elements from the front", () => {
    deque.addFront(1);
    deque.addBack(2);
    deque.addBack(3);
    deque.addFront(0);
    deque.addFront(-1);
    deque.addFront(-2);

    expect(deque.removeFront()).equal(-2);
    expect(deque.removeFront()).equal(-1);
    expect(deque.removeFront()).equal(0);
    expect(deque.removeFront()).equal(1);
    expect(deque.removeFront()).equal(2);
    expect(deque.removeFront()).equal(3);
    expect(deque.removeFront()).equal(undefined);
  });

  it("allows to peek at the front element in the deque without removing it", () => {
    expect(deque.peekFront()).equal(undefined);

    deque.addFront(1);
    expect(deque.peekFront()).equal(1);
    deque.addBack(2);
    expect(deque.peekFront()).equal(1);
    deque.addBack(3);
    expect(deque.peekFront()).equal(1);
    deque.addFront(0);
    expect(deque.peekFront()).equal(0);
    deque.addFront(-1);
    expect(deque.peekFront()).equal(-1);
    deque.addFront(-2);
    expect(deque.peekFront()).equal(-2);
  });

  it("allows to peek at the last element in the deque without removing it", () => {
    expect(deque.peekBack()).equal(undefined);

    deque.addFront(1);
    expect(deque.peekBack()).equal(1);
    deque.addBack(2);
    expect(deque.peekBack()).equal(2);
    deque.addBack(3);
    expect(deque.peekBack()).equal(3);
    deque.addFront(0);
    expect(deque.peekBack()).equal(3);
    deque.addFront(-1);
    expect(deque.peekBack()).equal(3);
    deque.addFront(-2);
    expect(deque.peekBack()).equal(3);
  });

  it("returns the correct size", () => {
    expect(deque.size()).equal(0);

    deque.addFront(1);
    expect(deque.size()).equal(1);
    deque.addBack(2);
    expect(deque.size()).equal(2);
    deque.addBack(3);
    expect(deque.size()).equal(3);
    deque.addFront(0);
    expect(deque.size()).equal(4);
    deque.addFront(-1);
    expect(deque.size()).equal(5);
    deque.addFront(-2);
    expect(deque.size()).equal(6);

    deque.clear();
    expect(deque.size()).equal(0);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.size()).equal(2);

    deque.removeFront();
    deque.removeBack();
    expect(deque.size()).equal(0);
  });

  it("returns if it is empty", () => {
    expect(deque.isEmpty()).equal(true);

    deque.addFront(1);
    expect(deque.isEmpty()).equal(false);
    deque.addBack(2);
    expect(deque.isEmpty()).equal(false);

    deque.clear();
    expect(deque.isEmpty()).equal(true);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.isEmpty()).equal(false);

    deque.removeFront();
    expect(deque.isEmpty()).equal(false);
    deque.removeBack();
    expect(deque.isEmpty()).equal(true);
  });

  it("clears the queue", () => {
    deque.clear();
    expect(deque.isEmpty()).equal(true);

    deque.addFront(1);
    deque.addBack(2);
    expect(deque.isEmpty()).equal(false);

    deque.clear();
    expect(deque.isEmpty()).equal(true);
  });

  it("returns toString primitive types", () => {
    expect(deque.toString()).equal("");

    deque.addFront(1);
    expect(deque.toString()).equal("1");

    deque.addBack(2);
    expect(deque.toString()).equal("1,2");

    deque.clear();
    expect(deque.toString()).equal("");

    const queueString = new Deque();
    queueString.addFront("el1");
    expect(queueString.toString()).equal("el1");

    queueString.addBack("el2");
    expect(queueString.toString()).equal("el1,el2");
  });

  it("returns toString objects", () => {
    class MyObj {
      constructor(public el1: any, public el2: any) {}
      toString() {
        return `${this.el1.toString()}|${this.el2.toString()}`;
      }
    }
    const dequeMyObj = new Deque();
    expect(dequeMyObj.toString()).equal("");

    dequeMyObj.addFront(new MyObj(1, 2));
    expect(dequeMyObj.toString()).equal("1|2");

    dequeMyObj.addBack(new MyObj(3, 4));
    expect(dequeMyObj.toString()).equal("1|2,3|4");
  });
});
