<template>
  <div class="flex-grow basis-0">
    <label class="inline-block" :for="title">{{ title }}</label>
    <input
      :id="title"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      class="text-field text-sm block w-full p-2"
      :type="type"
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
  type: { type: String, default: "text" },
});

const emit = defineEmits(["update:modelValue"]);

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>
