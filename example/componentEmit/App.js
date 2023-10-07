import { h } from "../../lib/mini-vue.esm.js";

import { Foo } from "./Foo.js";

export default {
  name: "App",
  // render函数
  render() {
    return h("div", {}, [
      h("div", {}, "App"),
      h(Foo, {
        // on + Event
        onAdd(a, b) {
          console.log("onAdd", a, b);
        },
        onAddFoo() {
          console.log("onAddFoo");
        },
      }),
    ]);
  },
  setup() {},
};
