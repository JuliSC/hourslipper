<template>
  <div>
    <p
      :class="{
        'text-green-300': checkValidation(error),
      }"
      class="opacity-75 text-xs"
      v-for="error in initialErrors"
      :key="error"
    >
      <font-awesome-icon :icon="handleIcon(checkValidation(error))" />
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  errors: { type: Array<string | undefined>, default: () => [] },
});

function checkValidation(error: string | undefined) {
  return !props.errors.includes(error);
}

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

// eslint-disable-next-line vue/no-setup-props-destructure
const initialErrors = props.errors;
</script>

<style scoped></style>
