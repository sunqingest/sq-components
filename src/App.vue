<script setup>
import { ref, onMounted } from "vue";
import Collapse from "./components/Collapse/Collapse.vue";
import collapseItem from "./components/Collapse/collapseItem.vue";
import Message from "./components/Message/Message.vue";
import { createMessage } from "./components/Message/method";
const collapseValue = ref([]);

onMounted(() => {
  const messageInstance = createMessage({
    message: "哈哈 111",
  });
  createMessage({
    message: "哈哈 222",
  });

  setTimeout(() => {
    messageInstance.destory();
  }, 5000);
});
</script>

<template>
  <Collapse v-model="collapseValue">
    <collapseItem title="哈哈第一个" name="1">
      <div style="background-color: aliceblue; height: 200px">
        展开的内容 我在打一个
      </div>
    </collapseItem>
    <collapseItem name="2">
      <template #header>哈哈这是第二个呀</template>
      <div style="background-color: red; height: 300px">我在第二行展开呢</div>
    </collapseItem>
  </Collapse>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
