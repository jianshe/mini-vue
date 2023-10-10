import { h, renderSlots } from "../../dist/guide-mini-vue.ejs.js";

export default {
  name: "Foo",
  setup(props, context) {},
  render() {
    return h("div", { "data-test": "foo" }, [
      h("div", {}, "foo"),
      // renderSlots 会返回一个 vnode
      // 其本质和 h 是一样的
      // 第三个参数给出数据
      renderSlots(this.$slots, "default", {
        age: 16,
      }),
    ]);
  },
};
