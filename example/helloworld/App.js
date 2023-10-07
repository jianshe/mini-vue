import { h } from "../../lib/mini-vue.esm.js";
window.self = null
export default {
  name: "App",
  // render函数
  render() {
    window.self = this
    // ui
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      // this.$el
      "hi, " + this.msg
      // string
      // "hi mini-vue"
      // array
      // [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
    );
  },
  setup() {
    // composition api
    return {
      msg: "mini-vue-haha",
    };
  },
};
