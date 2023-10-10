import { h } from "../../dist/guide-mini-vue.ejs.js";
export default {
  name: "Child",
  setup(props, { emit }) {},
  render(proxy) {
    return h("div", {}, [h("div", {}, "child-props-msg:  " + this.$props.msg)]);
  },
};
