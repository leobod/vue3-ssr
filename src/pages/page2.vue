<script>
import { request } from '../utils/request'
// 声明额外的选项
export default {
  // 对外暴露方法,执行store
  asyncData:  async (store) => {
    const result = await request({url: '/api/news', method: 'get'});
  },
}
</script>
<script setup>
import {onServerPrefetch, reactive, ref} from 'vue'
import { request } from '../utils/request'
import { useStore } from 'vuex';
const store = useStore();

const listModel = ref([])

onServerPrefetch(async () => {
  const result = await request({url: '/api/news', method: 'get'});
  store.dispatch('setMsg', result)
})

console.log(store.state.msg);

listModel.value = store.state.msg;


</script>

<template>
  <h1>Page1</h1>
  <ul>
    <li v-for="(item, idx) of listModel">
      {{ item.title }}
    </li>
  </ul>
  <div>store: {{ storeMsg }}</div>
</template>

<style scoped> </style>
