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
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ExpandIcon from "./icons/ExpandIcon.vue";
import LoadingIcon from "./icons/LoadingIcon.vue";

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
</script>
