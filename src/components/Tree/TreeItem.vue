<template>
  <div
    class="sq-tree__item"
    :style="{
      paddingLeft: `${item.level * 16}px`,
    }"
  >
    <div
      class="sq-tree__item__icon--container"
      :class="{
        collapse: !expanded,
      }"
    >
      <ExpandIcon></ExpandIcon>
    </div>

    <div
      class="sq-tree__item__icon--container sq-tree__item__icon--loading"
      v-if="isLoading"
    >
      <LoadingIcon />
    </div>

    <div class="sq-tree__item__content" @click="handleClick">
      <!-- {{ item.label }} -->
      <TreeItemContent :node="item" :slots="slots"></TreeItemContent>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import ExpandIcon from "./icons/ExpandIcon.vue";
import LoadingIcon from "./icons/LoadingIcon.vue";
import { treeContextKey } from "./types";
import TreeItemContent from "./treeItemContent";

defineOptions({
  name: "sq-tree-item",
});

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
  loadingKeys: {
    type: Set,
  },
});

const emit = defineEmits(["toggle"]);

const handleClick = () => {
  console.log("???");
  emit("toggle", props.item);
};

const isLoading = computed(() => {
  return props.loadingKeys.has(props.item.key);
  // return true;
});

// slots是一个插槽对象 每个插槽是个方法 返回的是一个包含虚拟dom的数组
// 不能直接在.vue的文件的template模板中直接编译 需要h渲染函数或者直接jsx
const treeContext = inject(treeContextKey);
const slots = treeContext.slots;
</script>
