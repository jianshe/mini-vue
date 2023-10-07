export function createComponentInstance(vnode) {
  const component = {
    type: vnode.type,
    vnode,
  };

  return component;
}

export function setupComponent(instance) {
  // initProps()
  // initSlots()

  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // 获取到用户给到的配置
  const Component = instance.type;

  const { setup } = Component;
  if (setup) {
    // function Object

    const setupResult = setup();
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
