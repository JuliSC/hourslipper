<template>
  <div>
    <p
      :class="{
        'text-green-300': validity.valid,
      }"
      class="opacity-75 text-xs"
      v-for="validity in validities"
      :key="validity.message"
    >
      <font-awesome-icon :icon="handleIcon(validity.valid)" />
      {{ validity.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  validities: {
    type: Array<{ message: string; valid: boolean }>,
    default: () => [],
  },
});

function handleIcon(validation: boolean) {
  switch (validation) {
    case true:
      return "fas fa-check-circle";
    case false:
      return "fas fa-times-circle";
    default:
      return "fas fa-times-circle";
  }
}
</script>

<style scoped></style>
