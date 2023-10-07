import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先转换为vnode
      // 所有的逻辑操作都会基于vnode做处理
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}
