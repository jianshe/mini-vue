import { effect } from "../reactivity/effect";
import { EMPTY_OBJ } from "../shared";
import { ShapeFlags } from "../shared/shapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppApi } from "./createApp";
import { Fragment, Text } from "./vnode";

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options;

  function render(vnode, container, parentComponent) {
    // path
    patch(null, vnode, container, parentComponent);
  }
  // n1 代表的是之前的虚拟节点;n2代表的是新的。
  function patch(n1, n2, container, parentComponent) {
    // 判断Vnode是不是一个element
    // 是element 那么 就应该处理element
    // 如何判断是element类型还是component类型
    // 可以通过type的类型来判断

    // Fragment -> 只渲染children

    const { type, shapeFlag } = n2;

    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;

      case Text:
        processText(n1, n2, container);
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
    }
  }
  function processElement(n1: any, n2: any, container: any, parentComponent) {
    // 先初始化
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container, parentComponent);
    }
  }

  function patchElement(n1, n2, container, parentComponent) {
    console.log("n1", n1);
    console.log("n2", n2);
    // props
    // children
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;

    const el = (n2.el = n1.el);

    patchChildren(n1, n2, el, parentComponent);
    patchProp(el, oldProps, newProps);
  }

  function patchChildren(n1, n2, container, parentComponent) {
    const prevShapeFlag = n1.shapeFlag;
    const { shapeFlag } = n2;
    const c1 = n1.children;
    const c2 = n2.children;

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // 证明当前新的节点是文本节点
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 1. 把老的children清空。
        unmountChildren(n1.children);
      }
      // 2. 设置新的text
      // 新的是Text，老的也是Text文本节点
      if (c1 !== c2) {
        hostSetElementText(container, c2);
      }
    } else {
      // 新的是一个数组
      // 如果老的是一个文本，先将文本清空掉
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, "");
        mountChildren(c2, container, parentComponent);
      }
    }
  }

  function unmountChildren(children) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el;
      // remove

      hostRemove(el);
    }
  }

  function patchProp(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevProp = oldProps[key];
        const nextProp = newProps[key];
        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp);
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }
  }

  function processText(n1: any, n2: any, container: any) {
    const { children } = n2;
    const textNode = (n2.el = document.createTextNode(children));
    container.append(textNode);
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    // Implement
    mountChildren(n2.children, container, parentComponent);
  }

  function processComponent(n1, n2, container, parentComponent) {
    mountComponent(n2, container, parentComponent);
  }

  function mountElement(vnode: any, container: any, parentComponent) {
    const el = (vnode.el = hostCreateElement(vnode.type));
    // string array
    const { children, shapeFlag } = vnode;
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // vnode
      mountChildren(vnode.children, el, parentComponent);
    }
    // props
    const { props } = vnode;

    for (const key in props) {
      const val = props[key];
      // const isOn = (key: string) => /^on[A-Z]/.test(key);
      // if (isOn(key)) {
      //   const event = key.slice(2).toLocaleLowerCase();
      //   el.addEventListener(event, val);
      // } else {
      //   el.setAttribute(key, val);
      // }
      hostPatchProp(el, key, null, val);
    }
    // container.append(el);
    // addChild()
    hostInsert(el, container);
  }

  function mountChildren(children, container, parentComponent) {
    children.forEach((v) => {
      patch(null, v, container, parentComponent);
    });
  }

  function mountComponent(initialVNode: any, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }

  function setupRenderEffect(instance: any, initialVNode: any, container) {
    effect(() => {
      if (!instance.isMounted) {
        console.log("init");
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));
        // vnode -> patch
        // vnode -> element
        patch(null, subTree, container, instance);

        initialVNode.el = subTree.el;

        instance.isMounted = true;
      } else {
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        instance.subTree = subTree;

        patch(prevSubTree, subTree, container, instance);
        console.log(subTree);
        console.log("update");
      }
    });
  }

  return {
    createApp: createAppApi(render),
  };
}
