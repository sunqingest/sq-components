<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup>
import { provide } from "vue";
import { formContextKey } from "./types.js";

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
  rules: {
    type: Object,
  },
});

// 将接受到的prop的model和rules通过provide提供给插槽内的formItem
provide(formContextKey, {
  model: props.model,
  rules: props.rules,
});
</script>
