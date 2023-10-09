import { NodeTypes } from "./ast";

export function transform(root, options = {}) {
  // 通过创建一个上下文对象，来存储我们的options
  const context = createTransformContext(root, options);

  // 1. 遍历 - 深度优先搜索
  traverseNode(root, context);
  // 2. 修改 text - content
}

function createTransformContext(root: any, options: any): any {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };
  return context;
}

function traverseNode(node: any, context: any) {
  if (node.type === NodeTypes.TEXT) {
    node.content = node.content + " mini-vue";
  }

  // 取出我们的nodeTransforms

  const nodeTransforms = context.nodeTransforms;

  for (let i = 0; i < nodeTransforms.length; i++) {
    const transform = nodeTransforms[i];
    transform[node];
  }
  traverseChildren(node, context);
}

function traverseChildren(node: any, context: any) {
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
