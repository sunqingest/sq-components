<template>
  <div style="width: 400px; height: 300px">
    <TreeItem
      v-for="item in flattenTree"
      :key="item.key"
      :item="item"
      :expanded="isExpanded(item)"
      @toggle="toggleExpand"
      :loadingKeys="loadingKeysSet"
    ></TreeItem>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, useSlots, provide } from "vue";
import TreeItem from "./TreeItem.vue";
import { treeContextKey } from "./types";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  keyField: {
    type: String,
    default: "key",
  },
  labelField: {
    type: String,
    default: "label",
  },
  childrenField: {
    type: String,
    default: "children",
  },
  // 默认展开的节点的key数组
  defaultExpandedKeys: {
    type: Array,
    default: () => [],
  },
  // 是否懒加载子节点，需与 load 方法结合使用
  lazy: {
    type: Boolean,
    default: false,
  },
  // 懒加载 加载子节点的方法
  load: {
    type: Function,
  },
});

const tree = ref([]);

onMounted(() => {
  tree.value = createTree(props.data);
});

// 监听props的data 每次变化 格式化树形结构
watch(
  () => props.data,
  (newValue) => {
    tree.value = createTree(newValue);
  }
);

const createOptions = (keyField, labelField, childrenField) => {
  return {
    getKey: (node) => {
      return node[keyField];
    },
    getLabel: (node) => {
      return node[labelField];
    },
    getChildren: (node) => {
      return node[childrenField];
    },
  };
};

const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
);

const createTree = (data, parent = null) => {
  const traversal = (data, parent = null) => {
    return data.map((node) => {
      const children = treeOptions.getChildren(node) || [];
      const treeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        isLeaf: node.isLeaf ?? children.length == 0,
      };
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode);
      }

      return treeNode;
    });
  };

  const result = traversal(data, parent);
  return result;
};

// 展开的key的节点数组
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));

// 拍平树结构
const flattenTree = computed(() => {
  let expandedKeys = expandedKeysSet.value;
  // 最终拍平的节点
  const flattenNodes = [];
  // 经过格式化后的树形数据 第一项默认肯定是展示的
  const nodes = tree.value;
  // 使用栈 来实现递归遍历
  const stack = [];
  // 因为stack 先进后出 所以遍历的时候 要倒叙
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i]);
  }

  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      continue;
    }
    flattenNodes.push(node);
    if (expandedKeys.has(node.key)) {
      // 如果展示的key数组里存在 他的children也需要展示

      const children = node.children;
      if (children) {
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }
  }
  return flattenNodes;
});
const isExpanded = (node) => {
  return expandedKeysSet.value.has(node.key);
};

// 展开 折叠
const collapse = (node) => {
  expandedKeysSet.value.delete(node.key);
};

const expand = (node) => {
  expandedKeysSet.value.add(node.key);

  if (props.lazy) {
    triggerLoading(node);
  }
};

const toggleExpand = (node) => {
  const expandedKeys = expandedKeysSet.value;
  // 限制lazy 懒加载的时候 不让进行展开折叠操作
  if (loadingKeysSet.value.has(node.key)) {
    return;
  }

  if (expandedKeys.has(node.key)) {
    collapse(node);
  } else {
    expand(node);
  }
};

// 维护一个当前正在异步请求懒加载的节点的set
const loadingKeysSet = ref(new Set());

const triggerLoading = (node) => {
  // 判断当前的children 是否已经有值 说明已经懒加载过了  判断当前是否是叶子结点
  if (node.children.length == 0 && !node.isLeaf) {
    const loadingKeys = loadingKeysSet.value;
    if (!loadingKeys.has(node.key)) {
      // 说明当前节点没正在懒加载
      loadingKeys.add(node.key);
      // 用户传入的load是一个返回promise的函数
      // 传给用户操作的值 是用户传入的原始的值
      props.load(node.rawNode).then((children) => {
        // 返回的是子节点children
        // 给用户的原生的值赋值
        node.rawNode[props.childrenField] = children;
        // 给格式化之后的node也赋值 这个需要格式化一下
        node.children = createTree(children, node);
        console.log(node.children, "请求并且赋值完成");
        loadingKeys.delete(node.key);
      });
    }
  }
};

const slots = useSlots();

// 将自定义节点内容插槽 通过provide注入到下面的子节点
provide(treeContextKey, {
  slots: slots,
});
</script>
