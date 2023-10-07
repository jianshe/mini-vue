const ShapeFlags = {
    ELEMENT: 0,
    STATEFUL_COMPONENT: 0,
    TEXT_CHILDREN: 0,
    ARRAY_CHILDREN: 0,
}

// vnode->stateful_conponent->
// 1. 可以设置修改
// ShapeFlags.stateful_component = 1;
// ShapeFlags.array_children = 1;

// 2. 查找
// if (shapeFlags.element)
// if (shapeFlags.stateful_component)

// 不够高效 -> 使用位运算符的方式来

// 0000
// 0001 -> element
// 0010 -> stateful
// 0100 -> text_children
// 1000 -> array_children

// 1010

// | （两位都为0： 才为0）
// & (两位都为1： 才为1)
// 修改
0000
0001
————
0001
0100
————
0101

// 查找 &
0001
0001
&&&&
0001

0010
0001
&&&&
0000