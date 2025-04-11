<template>
  <div class="sq-input">
    <input
      :type="type"
      v-model="inputValue"
      @input="handleInput"
      class="sq-input__inner"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup>
import { ref, watch, inject } from "vue";
import { formItemContextKey } from "../Form/types";

defineOptions({
  name: "sq-input",
});

// formItem组件内的input select等 通过key值注入inject
const formItemContext = inject(formItemContextKey);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "input"]);
const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const handleInput = () => {
  emit("update:modelValue", inputValue.value);
  emit("input", inputValue.value);
  runValidate("change");
};

const runValidate = (trigger) => {
  formItemContext.validate(trigger).catch((error) => {
    console.log(error);
  });
};

const handleBlur = () => {
  // console.log("input标签的blur事件");
  runValidate("blur");
};
</script>
