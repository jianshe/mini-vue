import Queue from "../src/queue";

describe("queue", () => {
  it("happy path", () => {
    beforeEach(() => {
      const queue = new Queue();
      expect(queue.isEmpty()).eq(true);
      expect(queue.size()).eq(0);
    });
  });

  it("queue push", () => {
    const queue = new Queue();
    queue.enQueue(1);
    queue.enQueue(2);
    queue.enQueue(3);
    expect(queue.toObjString()).eq("1,2,3");
  });

  it("queue pop",()=> {
    const queue = new Queue();
    queue.enQueue(1);
    queue.enQueue(2);
    expect(queue.toObjString()).eq("1,2");
    queue.deQueue()
    // const result = queue.deQueue()
    // expect(result).eq(1)
    expect(queue.toObjString()).eq("2");
  })

  it("queue clear",() => {
    const queue = new Queue()
    queue.enQueue(1)
    queue.enQueue(2)
    expect(queue.toObjString()).eq("1,2");
    queue.clear()
    expect(queue.toObjString()).eq("");
  })

  it("queue size",() => {
    const queue = new Queue()
    queue.enQueue(1)
    queue.enQueue(2)
    expect(queue.size()).eq(2)
    queue.clear()
    expect(queue.size()).eq(0)
  })

  it('queue peek', () => {
    const queue = new Queue()
    queue.enQueue(1)
    queue.enQueue(2)
    expect(queue.peek()).eq(1)
    queue.deQueue()
    expect(queue.peek()).eq(2)
  })
});
