import { h, getCurrentInstance } from "../../dist/guide-mini-vue.ejs.js";
import { Foo } from "./Foo.js";

export default {
  name: "App",
  // render函数
  render() {
    return h("div", {}, [h("p"), {}, "currentInstance demo", h(Foo)]);
  },
  setup() {
    const instance = getCurrentInstance();
    console.log("App: ", instance);
  },
};
