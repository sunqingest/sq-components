<template>
  <button
    class="sq-button"
    :class="{
      [`sq-button--${type}`]: type,
      'is-disabled': disabled,
    }"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
defineOptions({
  name: "sq-button",
});

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
