import { camelize, hyphenate, toHandlerKey } from "../shared";
export function emit(instance, event: string, ...rawArgs) {
  const { props } = instance
  let handler = props[toHandlerKey(camelize(event))];

  if (!handler) {
    handler = props[toHandlerKey(hyphenate(event))];
  }

  if (handler) {
    handler(...rawArgs);
  }
}
