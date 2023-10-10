import { ref } from "../../dist/guide-mini-vue.ejs.js";

export default {
  name: "App",
  template: `<div>hi,{{message}} {{count}}</div>`,

  setup() {
    const count = (window.count = ref(1));
    return { message: "mini-vue", count };
  },
};
