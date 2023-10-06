import { track, trigger } from "./effect";
const get = createGetter();
const set = createSetter();

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);

    if (!isReadonly) {
      // 在触发 get 的时候进行依赖收集
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value) {
    const result = Reflect.set(target, key, value);

    trigger(target, key);

    return result;
  };
}

export const readonlyHandlers = {
  get: createGetter(true),
  set(target, key) {
    // readonly 的响应式对象不可以修改值
    console.warn(
      `Set operation on key "${String(key)}" failed: target is readonly.`,
      target
    );
    return true;
  },
};

export const mutableHandlers = {
  get,
  set,
};

export const shallowReadonlyHandlers = {
  get: createGetter(true),
  set(target, key) {
    // readonly 的响应式对象不可以修改值
    console.warn(
      `Set operation on key "${String(key)}" failed: target is readonly.`,
      target
    );
    return true;
  },
};
