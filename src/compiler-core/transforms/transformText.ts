import { NodeTypes } from "../ast";
import { isText } from "../utils";

export function transformText(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    return () => {

      const children = node.children;
      let currentContainer;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (isText(child)) {
          // 看看下一个节点是不是 text 类
          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];
            if (isText(next)) {
              // currentContainer 的目的是把相邻的节点都放到一个 容器内
              if (!currentContainer) {
                currentContainer = children[i] = {
                  type: NodeTypes.COMPOUND_EXPRESSION,
                  loc: child.loc,
                  children: [child],
                };
              }

              currentContainer.children.push(` + `, next);
              // 把当前的节点放到容器内, 然后删除掉j
              children.splice(j, 1);
              // 因为把 j 删除了，所以这里就少了一个元素，那么 j 需要 --
              j--;
            } else {
              currentContainer = undefined;
              break;
            }
          }
        }
      }
    };
  }
}