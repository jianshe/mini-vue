import { h } from "../../lib/mini-vue.esm.js";

export const Foo = {
  setup(props) {
    // props.count
    console.log(props);
    props.count++;
    // props传递过来的值是不允许修改的
  },
  render() {
    return h("div", {}, "foo: " + this.count);
  },
};
