import { h } from "../../lib/mini-vue.esm.js";
export default {
  name: "App",
  setup() {
    // composition api
    return {
      x: 100,
      y: 100,
    };
  },
  // render函数
  render() {
    return h("rect", {
      x: this.x,
      y: this.y,
    });
  },
};
