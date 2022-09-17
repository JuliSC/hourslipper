<template>
  <div class="flex-grow basis-0">
    <label class="inline-block" :for="title">{{ title }}</label>
    <input
      :id="title"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      class="text-field block w-full"
      type="text"
    />
    <p class="text-xs">
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: "" },
  title: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>
