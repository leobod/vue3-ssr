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
import { useStore } from 'vuex';

const store = useStore();
// 获取异步数据
store.dispatch('asyncSetMsg');
// 得到后赋值
const storeMsg = computed(() => store.state.msg);

const listModel = reactive({
  list: [
    { label: '标签1', value: 1 },
    { label: '标签2', value: 2 },
    { label: '标签3', value: 3 },
    { label: '标签4', value: 4 }
  ]
})

</script>

<template>
  <h1>Page1</h1>
  <ul>
    <li v-for="(item, idx) of listModel.list">
      {{ item.label }}
    </li>
  </ul>
  <div>store: {{ storeMsg }}</div>
</template>

<style scoped> </style>
