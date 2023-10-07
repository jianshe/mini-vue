'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createVNode(type, prop, children) {
    return {
        type: type,
        prop: prop,
        children: children
    };
}

var h = function (type, props, children) {
    return createVNode(type, props, children);
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
    patch(vnode);
}
function patch(vnode, container) {
    // 去处理组件
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    var instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    var subTree = instance.render();
    // vnode -> patch
    // vnode -> element
    patch(subTree);
}

function createApp(rootComponent) {
    return {
        mount: function (rootContainer) {
            // 先转换为vnode
            // 所有的逻辑操作都会基于vnode做处理
            var vnode = createVNode(rootComponent);
            render(vnode);
        },
    };
}

exports.createApp = createApp;
exports.h = h;
//# sourceMappingURL=mini-vue.cjs.js.map
