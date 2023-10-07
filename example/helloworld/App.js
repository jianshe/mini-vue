import { h } from "../../lib/mini-vue.esm.js";
export default {
  name: "App",
  // render函数
  render() {
    return h("div", "hi, " + this.msg);
  },
  setup() {
    // composition api
    return {
      msg: "mini-vue",
    };
  },
};
