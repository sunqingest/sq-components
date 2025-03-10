<template>
  <div
    class="sq-form-item"
    :class="{
      'is-error': isError,
    }"
  >
    <div class="sq-form-item__label-wrap">
      <label class="sq-form-item__label">{{ label }}</label>
    </div>

    <div class="sq-form-item__content">
      <slot></slot>
      <div class="sq-form-item__error" v-if="isError">
        {{ validateData.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, inject, computed, reactive, provide } from "vue";
import { formContextKey, formItemContextKey } from "./types";
import Schema from "async-validator";
const formContext = inject(formContextKey);

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  prop: {
    type: String,
  },
});

const validateData = reactive({
  status: "init", // 'init' 'success' 'error'
  errorMsg: "",
  loading: false,
});

const itemValue = computed(() => {
  return formContext.model[props.prop];
});

const rule = computed(() => {
  return formContext.rules[props.prop];
});

const isError = () => {
  return validateData.status == "error";
};

const validate = () => {
  if (props.prop == null) {
    return;
  }
  const descriptor = {
    [props.prop]: rule.value,
  };
  const validator = new Schema(descriptor);
  validateData.loading = true;
  console.log(
    {
      [props.prop]: itemValue.value,
    },
    descriptor,
    "xishuashua"
  );
  validator
    .validate({
      [props.prop]: itemValue.value,
    })
    .then(() => {
      validateData.errorMsg = "";
      validateData.status = "success";
    })
    .catch(({ errors }) => {
      validateData.status = "error";
      if (errors.length > 0) {
        validateData.errorMsg = errors[0].message;
      }
    })
    .finally(() => {
      validateData.loading = false;
    });
};

// formItem 将自己的校验方法通过provide传递给自己的插槽内的子组件
// 组件库封装的form内部的表单组件 通过inject注入
provide(formItemContextKey, {
  validate,
});
</script>
