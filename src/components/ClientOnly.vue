<template>
  <slot v-if="isClient"></slot>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const isClient = ref(false);

    onMounted(() => {
      isClient.value = true;
    });

    return {
      isClient,
    };
  },
};
</script>
