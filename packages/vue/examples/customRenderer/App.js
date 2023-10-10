import { h } from "../../dist/guide-mini-vue.ejs.js";
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
