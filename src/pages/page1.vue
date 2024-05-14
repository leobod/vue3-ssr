<script>
// 声明额外的选项
export default {
  // 对外暴露方法,执行store
  asyncData: (store) => {
    return store.dispatch('asyncSetMsg');
  },
}
</script>
<script setup>
import { reactive, computed } from 'vue'
const listModel = reactive({ list: [] })


import { useStore } from 'vuex';
const store = useStore();

if (store.state.msg && store.state.msg.length > 0) {
  listModel.list = store.state.msg
} else {
  store.dispatch('asyncSetMsg').then(() => {
    listModel.list = store.state.msg
  })
}

</script>

<template>
  <h1>Page1</h1>
  <ul>
    <li v-for="(item, idx) of listModel.list">
      {{ item.title }}
    </li>
  </ul>
  <div>store: {{ storeMsg }}</div>
</template>

<style scoped> </style>
