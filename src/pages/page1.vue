<script>
import { serverAsyncData } from "../utils/useAsyncData";
// 声明额外的选项
export default {
  asyncData: async (_asyncData) => {
    await serverAsyncData(
      { url: "/api/news", method: "get" },
      _asyncData,
      "news"
    );
  },
};
</script>
<script setup>
import { reactive } from "vue";
import { useAsyncData } from "../utils/useAsyncData";
import ClientOnly from "../components/ClientOnly.vue";
import HelloWorld from "../components/HelloWorld.vue";

const listModel = reactive({ list: [] });

useAsyncData({ url: "/api/news", method: "get" }, "news").then((res) => {
  listModel.list = res.data;
});
</script>

<template>
  <h1>Page1</h1>
  <ul>
    <li v-for="(item, idx) of listModel.list">
      {{ item.title }}
    </li>
  </ul>
  <ClientOnly>
    <HelloWorld />
  </ClientOnly>
</template>

<style scoped></style>
../utils/useAsyncData../utils/useAsyncData
