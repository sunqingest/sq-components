<template>
  <CheckboxGroup v-model="checkedList">
    <Checkbox label="苹果" value="apple"></Checkbox>
    <Checkbox label="香蕉" value="banana"></Checkbox>
  </CheckboxGroup>
</template>

<script setup>
import { ref } from "vue";
import CheckboxGroup from "@/components/Checkbox/CheckboxGroup.vue";
import Checkbox from "@/components/Checkbox/Checkbox.vue";

const isChecked = ref(true);
const checkedList = ref(["apple"]);
</script>
