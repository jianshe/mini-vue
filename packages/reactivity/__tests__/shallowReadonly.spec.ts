import { isReactive, shallowReadonly } from "../src/reactive";
import { describe,expect,test} from "vitest";

describe("shallowReadonly", () => {
  test("should not make non-reactive properties reactive", () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReactive(props.n)).toBe(false);
  });
});