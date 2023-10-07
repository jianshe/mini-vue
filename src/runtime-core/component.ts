import { shallowReadonly } from "../reactivity/reactive";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
  const component = {
    type: vnode.type,
    vnode,
    setupState: {},
    props: {},
  };

  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  // initSlots()

  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // 获取到用户给到的配置
  const Component = instance.type;
  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = Component;
  if (setup) {
    // function Object

    const setupResult = setup(shallowReadonly(instance.props));
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}
