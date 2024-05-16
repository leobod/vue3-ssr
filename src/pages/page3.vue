<script setup>
const onClick = function () {
  console.log("Button clicked");
};
</script>

<template>
  <h1>Page3</h1>

  <el-button @click="onClick">Click Me</el-button>

  <el-icon :size="20">
    <Edit />
  </el-icon>
</template>

<style scoped></style>
