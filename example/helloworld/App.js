import { h } from "../../lib/mini-vue.esm.js";
export default {
  name: "App",
  // render函数
  render() {
    // ui
    // return h("div", "hi, " + this.msg);

    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      // string
      // "hi mini-vue"
      // array
      [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
    );
  },
  setup() {
    // composition api
    return {
      msg: "mini-vue",
    };
  },
};
