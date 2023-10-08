import { h } from "../../lib/mini-vue.esm.js";

export const Foo = {
  setup(props) {},
  render() {
    const foo = h("p", {}, "foo");
    return h("div", {}, [foo, this.$slots]);
  },
};
