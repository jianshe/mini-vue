import { generate } from "../codegen";
import { baseParse } from "../parse";
import { transform } from "../transform";

describe("codegen", () => {
  it("string", () => {
    const ast = baseParse("hi");
    transform(ast);
    const { code } = generate(ast);
    // 快照测试 1. 抓bug 2. 有意（主动更新快照）。

    expect(code).toMatchSnapshot();
  });
});
