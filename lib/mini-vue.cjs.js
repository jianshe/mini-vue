'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createVNode(type, props, children) {
    return {
        type: type,
        props: props,
        children: children
    };
}

var h = function (type, props, children) {
    return createVNode(type, props, children);
};

var isObject = function (val) {
    return val !== null && typeof val === "object";
};

function createComponentInstance(vnode) {
    var component = {
        type: vnode.type,
        vnode: vnode,
    };
    return component;
}
function setupComponent(instance) {
    // initProps()
    // initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    // 获取到用户给到的配置
    var Component = instance.type;
    var setup = Component.setup;
    if (setup) {
        // function Object
        var setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    var Component = instance.type;
    if (Component.render) {
        instance.render = Component.render;
    }
}

function render(vnode, container) {
    // path
    patch(vnode, container);
}
function patch(vnode, container) {
    // 判断Vnode是不是一个element
    // 是element 那么 就应该处理element
    // 如何判断是element类型还是component类型
    // 可以通过type的类型来判断
    if (typeof vnode.type === "string") {
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    // 先初始化
    mountElement(vnode, container);
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountElement(vnode, container) {
    var el = document.createElement(vnode.type);
    // string array
    var children = vnode.children;
    if (typeof children === "string") {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        // vnode
        mountChildren(vnode, el);
    }
    // props
    var props = vnode.props;
    for (var key in props) {
        var val = props[key];
        el.setAttribute(key, val);
    }
    container.append(el);
}
function mountChildren(vnode, container) {
    vnode.children.forEach(function (v) {
        patch(v, container);
    });
}
function mountComponent(vnode, container) {
    var instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render();
    // vnode -> patch
    // vnode -> element
    patch(subTree, container);
}

function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            // 先转换为vnode
            // 所有的逻辑操作都会基于vnode做处理
            var vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}

exports.createApp = createApp;
exports.h = h;
//# sourceMappingURL=mini-vue.cjs.js.map
