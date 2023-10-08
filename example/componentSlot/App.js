import { h, createTextVNode } from "../../lib/mini-vue.esm.js";

import Foo from "./Foo.js";

export default {
  name: "App",
  setup() {},

  render() {
    return h("div", {}, [
      h("div", {}, "你好"),
      h(
        Foo,
        {
          msg: "your name is Foo",
        },
        {
          default: ({ age }) => [
            h("p", {}, "我是通过 slot 渲染出来的第一个元素 "),
            h("p", {}, "我是通过 slot 渲染出来的第二个元素"),
            h("p", {}, `我可以接收到 age: ${age}`),
            createTextVNode("你好呀"),
          ],
        }
      ),
    ]);
  },
};
