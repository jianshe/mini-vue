import { h, renderSlots } from "../../lib/mini-vue.esm.js";

export default {
  name: "Child",
  setup(props, context) {},
  render() {
    return h("div", { "data-test": "child" }, [
      h("div", {}, "child"),
      // renderSlots 会返回一个 vnode
      // 其本质和 h 是一样的
      // 第三个参数给出数据
      renderSlots(this.$slots, "default", {
        age: 16,
      }),
    ]);
  },
};
