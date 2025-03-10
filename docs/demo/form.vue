<template>
  <SqForm :model="formData" :rules="rules">
    <SqFormItem label="姓名" prop="name">
      <Input v-model="formData.name"></Input>
    </SqFormItem>
    <SqFormItem label="手机号" prop="phone">
      <Input v-model="formData.phone"></Input>
    </SqFormItem>
  </SqForm>
</template>

<script setup>
import { reactive } from "vue";
import SqForm from "@/components/Form/Form.vue";
import SqFormItem from "@/components/Form/FormItem.vue";
import Input from "@/components/Input/Input.vue";

const formData = reactive({
  name: "",
  phone: "",
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入姓名",
    },
    {
      min: 1,
      max: 6,
      message: "字数在1-6个之间",
    },
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号",
    },
    {
      min: 11,
      max: 11,
      message: "字数必须11位",
    },
    {
      // type: "regexp",
      pattern:
        /^1(3\d|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      message: "请输入正确格式的手机号",
    },
  ],
});
</script>
