<template>
  <div class="flex-grow basis-0">
    <label class="inline-block" :for="title">{{ title }}</label>
    <div class="flex justify-center items-center rounded bg-input-background">
      <input
        :id="title"
        ref="input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        class="bg-transparent text-sm block w-full p-2 focus:outline-none"
        :type="typeMutable"
      />
      <font-awesome-icon
        v-if="type === 'password'"
        class="px-2 hover:cursor-pointer"
        :icon="handlePassword"
        @click="typeMutable = typeMutable === 'password' ? 'text' : 'password'"
      />
    </div>
    <p class="text-xs">
      <slot></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  title: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
});

const input = ref(null);

// eslint-disable-next-line vue/no-setup-props-destructure
const typeMutable = ref<string>(props.type);

const emit = defineEmits(["update:modelValue"]);

const handlePassword = computed(() => {
  return typeMutable.value === "password" ? "fas fa-eye-slash" : "fas fa-eye";
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>
