import { hasOwn } from "../shared";

const publicPropertiesMap = {
  // 当用户调用 instance.proxy.$emit 时就会触发这个函数
  // i 就是 instance 的缩写 也就是组件实例对象
  $el: (i) => i.vnode.el,
  $slots:(i) => i.slots,
  $props:(i) => i.props
};

// todo 需要让用户可以直接在 render 函数内直接使用 this 来触发 proxy
export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // setupState
    const { setupState, props } = instance;
    if (key in setupState) {
      return setupState[key];
    }
    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    const publicGetter = publicPropertiesMap[key];

    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
