import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
  // path
  patch(vnode, container);
}

function patch(vnode, container) {
  // 判断Vnode是不是一个element
  // 是element 那么 就应该处理element
  // 如何判断是element类型还是component类型
  // 可以通过type的类型来判断

  // Fragment -> 只渲染children

  const { type, shapeFlag } = vnode;

  switch (type) {
    case Fragment:
      processFragment(vnode, container);
      break;

    case Text:
      processText(vnode, container);
      break;

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container);
      }
  }
}
function processElement(vnode: any, container: any) {
  // 先初始化
  mountElement(vnode, container);
}

function processText(vnode: any, container: any) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}

function processFragment(vnode: any, container: any) {
  // Implement
  mountChildren(vnode, container);
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type));
  // string array
  const { children, shapeFlag } = vnode;
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // vnode
    mountChildren(vnode, el);
  }
  // props
  const { props } = vnode;

  for (const key in props) {
    const val = props[key];
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function mountComponent(initialVNode: any, container) {
  const instance = createComponentInstance(initialVNode);
  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance: any, initialVNode: any, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> patch
  // vnode -> element

  patch(subTree, container);

  initialVNode.el = subTree.el;
}
