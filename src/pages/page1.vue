<script setup>
import { reactive } from 'vue'

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
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
