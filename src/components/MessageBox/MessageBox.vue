<template>
  <Transition name="fade-in" @after-leave="$emit('destory')">
    <Overlay
      style="display: flex; align-items: center; justify-content: center"
      @click="handleMaskClick"
      v-show="visible"
    >
      <div class="sq-message-box">
        <div class="sq-message-box__header">头部</div>
        <div class="sq-message-box__content">内容</div>
        <div class="sq-message-box__footer" @click="handleAction">footer</div>
      </div>
    </Overlay>
  </Transition>
</template>

<script setup>
import Overlay from "../Overlay/Overlay.vue";
import { nextTick, onMounted, reactive, ref, watch } from "vue";
import { useZIndex } from "../../hooks/useZIndex.js";
defineOptions({
  name: "sq-message-box",
  inheritAttrs: false,
});

const props = defineProps({
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  beforeClose: {
    type: Function,
  },
  showCancelButton: {
    type: Boolean,
    default: false,
  },
});

const visible = ref(false);

const emit = defineEmits(["destory", "action"]);

const { nextZIndex } = useZIndex();

const state = reactive({
  ...props,
  zIndex: nextZIndex(),
  action: "",
});

watch(visible, (value) => {
  if (value) {
    state.zIndex = nextZIndex();
  }
});

const handleMaskClick = () => {
  props.closeOnClickModal && handleAction("close");
};

const handleClose = async () => {
  if (!visible.value) {
    return;
  }
  visible.value = false;
  await nextTick();
  if (state.action) {
    emit("action", state.action);
  }
};

const handleAction = (action) => {
  state.action = action;
  if (state.beforeClose) {
    state.beforeClose(action, state, handleClose);
  } else {
    handleClose();
  }
};

onMounted(() => {
  visible.value = true;
});

defineExpose({
  visible,
});
</script>
