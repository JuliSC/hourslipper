<template>
  <div class="w-full">
    <label class="inline-block capitalize" :for="props.dateType">
      {{ props.title }}
    </label>
    <input
      class="date-field block rounded w-full text-sm p-2"
      type="date"
      :id="props.dateType"
      name="entry-start"
      v-model.lazy="date"
      :oninput="updateDate()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  value: { type: String, default: Date.now() },
  dateType: { type: String, required: true },
});

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};
const date = ref<string>(
  new Date(props.value).toLocaleString("en-CA", options),
);

const emit = defineEmits({
  updateDate(args) {
    return true;
  },
});

function updateDate() {
  emit("updateDate", { date: date.value, dateType: props.dateType });
}
</script>
