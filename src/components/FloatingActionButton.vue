<template>
  <button
    class="flex justify-center items-center shadow-lg w-14 h-14 rounded-full text-white text-2xl bg-component-background transition-all ease-in-out md:hover:-translate-y-1 md:hover:shadow-3xl"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  icon: { type: String, required: true },
  text: { type: String, required: true },
});
</script>

<style></style>
