export function generate(ast) {
  // 生成 context
  const context = createCodegenContext();
  const { push } = context;
  const functionName = "render";
  const args = ["_ctx", "_cache"];
  const signature = args.join(", ");
  push(`function ${functionName}(${signature}) {`);
  push("return ");
  genNode(ast.codegenNode, context);

  push("}");

  return {
    code: context.code,
  };
}

function genNode(node: any, context: any) {
  const { push } = context;
  push(`'${node.content}'`);
}

function createCodegenContext(): any {
  const context = {
    code: "",
    push(source) {
      context.code += source;
    },
  };

  return context;
}
