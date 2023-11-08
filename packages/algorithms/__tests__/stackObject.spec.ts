import Stack from "../src/stackObject";

describe("stackObject", () => {
  it("happy path", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.toString();
    expect(stack.toString()).eq("1,2");
    expect(stack.size()).eq(2)
    expect(stack.isEmpty()).eq(false)
    stack.pop()
    expect(stack.toString()).eq(1)
    stack.pop()
    expect(stack.isEmpty()).eq(true)
  });
});
