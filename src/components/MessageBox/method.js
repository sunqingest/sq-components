import { h, render, ref, nextTick } from "vue";
import MessageBoxConstractor from "./MessageBox.vue";

const messageInstanceMap = new Map();

export function createMessage(options) {
  const container = document.createElement("div");

  const props = {
    ...options,
    onDestory: () => {
      render(null, container);
      messageInstanceMap.delete(vm);
    },
    onAction: (action) => {
      const currentMsg = messageInstanceMap.get(vm);
      let resolve;
      resolve = action;
      nextTick(() => vm.doClose());
      if (options.callback) {
        options.callback(resolve);
        return;
      }
      if (action == "cancel" || action == "close") {
        currentMsg.reject(action);
        return;
      }
      currentMsg.resolve();
    },
  };

  const vnode = h(MessageBoxConstractor, props);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild);
  // 拿到虚拟节点上的component实例对象

  const vm = vnode.component;
  return vm;
}
export function MessageBox(options) {
  let callback;
  if (options.callback) {
    callback = options.callback;
  }

  return new Promise((resolve, reject) => {
    const instance = createMessage(options);
    messageInstanceMap.set(instance, { options, callback, resolve, reject });
  });
}

// 给MessageBox函数对象添加alert confirm等方法
const MESSAGE_BOX_VARIANTS = ["alert", "confirm"];
MESSAGE_BOX_VARIANTS.forEach((boxType) => {
  MessageBox[boxType] = messageBoxFactory(boxType);
});

const MESSAGE_BOX_DEFAULT_OPTS = {
  alert: {
    closeOnClickModal: false,
  },
  confirm: {
    showCancelButton: true,
  },
};

function messageBoxFactory(boxType) {
  return (message, title, options) => {
    return MessageBox({
      title,
      message,
      ...options,
      ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
    });
  };
}
