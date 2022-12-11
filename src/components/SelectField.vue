<template>
  <div class="flex-grow basis-0 cursor-default">
    <label class="inline-block" :for="title">{{ title }}</label>
    <div class="relative w-full">
      <div
        tabindex="0"
        @click="showOptions"
        class="relative block select-field-button"
      >
        <p class="select-none p-1 text-sm">{{ modelValue.name }}</p>
      </div>
      <Transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="select-field-list z-10 list-none absolute mt-1 max-h-56 w-full overflow-auto rounded shadow-lg"
        >
          <li
            class="hover:bg-slate-500 text-sm p-2"
            v-for="option in options"
            @click="select(option)"
            :key="option.value"
          >
            {{ option.name }}
          </li>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<{ name: string; value: string }>,
    default: () => {
      return { name: "", value: "" };
    },
  },
  title: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  options: { type: Array<{ name: string; value: string }>, default: () => [] },
});

const show = ref<boolean>(false);

const emit = defineEmits(["update:modelValue"]);

const eventHandler = function () {
  show.value = false;
  removeEventListener("click", eventHandler);
};

function showOptions() {
  if (!show.value) {
    show.value = true;
    setTimeout(() => {
      addEventListener("click", eventHandler);
    }, 100);
  }
}

function select(option: { name: string; value: string }) {
  show.value = false;

  emit("update:modelValue", option);
}
</script>
