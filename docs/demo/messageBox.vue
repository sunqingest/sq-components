<template>
  <div @click="handleClick">调用</div>
</template>

<script setup>
import { MessageBox } from "@/components/MessageBox/method.js";

const handleClick = () => {
  MessageBox({
    title: "这是标题哈哈哈",
  });
};
</script>
