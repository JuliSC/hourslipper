<template>
  <form
    class="w-full md:w-1/2"
    action="POST"
    @submit.prevent="updateAccountSettings()"
  >
    <CardBase>
      <template #header>
        <h1>Hourslipper Settings</h1>
      </template>
      <template #body>
        <div class="mt-4">
          <InputField
            title="API Key"
            type="password"
            placeholder="Enter your toggl API key"
            v-model="userStore.user.settings.apiKey"
          ></InputField>
        </div>
        <div class="mt-4">
          <InputField
            title="Hours Append"
            type="text"
            placeholder="Ex: 'hrs' or 'hours'"
            v-model="userStore.user.settings.hoursAppend"
          ></InputField>
        </div>
        <div class="mt-4">
          <InputField
            title="Date Header"
            type="text"
            placeholder="Ex: 'Date' or 'Day'"
            v-model="userStore.user.settings.dateHeader"
          ></InputField>
        </div>
        <div class="mt-4">
          <InputField
            title="Hours Header"
            type="text"
            placeholder="Ex: 'Time' or 'Hours'"
            v-model="userStore.user.settings.hoursHeader"
          ></InputField>
        </div>
        <div class="mt-4">
          <SelectField
            title="Date Format"
            v-model="userStore.user.settings.dateFormat"
            :options="dateFormatOptions"
          />
        </div>
        <div class="mt-4">
          <InputField
            title="Separator"
            type="text"
            placeholder="Ex: '-' or '/'"
            v-model="userStore.user.settings.separator"
          ></InputField>
        </div>
        <div class="mt-4">
          <SelectField
            title="Weekday"
            v-model="userStore.user.settings.weekdayFormat"
            :options="weekdayOptions"
          />
        </div>
        <div class="mt-4">
          <SelectField
            title="Language"
            v-model="userStore.user.settings.language"
            :options="langOptions"
          />
        </div>
      </template>
      <template #footer>
        <div>
          <button type="submit" class="btn mr-2">Save</button>
        </div>
      </template>
    </CardBase>
  </form>
</template>

<script setup lang="ts">
import CardBase from "@/components/CardBase.vue";
import InputField from "@/components/InputField.vue";
import SelectField from "@/components/SelectField.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
const userStore = useUserStore();

const dateFormat = ref<{ name: string; value: string }>({
  name: "DD-MM-YYYY",
  value: "en-UK",
});

const language = ref<{ name: string; value: string }>({
  name: "English",
  value: "en-US",
});

const weekdayFormat = ref<{ name: string; value: string }>({
  name: "Not included",
  value: "none",
});

// Options
const dateFormatOptions = ref<Array<{ name: string; value: string }>>([
  {
    name: "DD-MM-YYYY",
    value: "en-UK",
  },
  {
    name: "MM-DD-YYYY",
    value: "en-US",
  },
  {
    name: "YYYY-MM-DD",
    value: "en-CA",
  },
]);

const langOptions = ref<Array<{ name: string; value: string }>>([
  {
    name: "English",
    value: "english",
  },
  {
    name: "Danish",
    value: "da-DK",
  },
]);

const weekdayOptions = ref<Array<{ name: string; value: string }>>([
  {
    name: "Not included",
    value: "none",
  },
  {
    name: "Short (Mon, Tue...)",
    value: "short",
  },
  {
    name: "Full (Monday, Tuesday...)",
    value: "long",
  },
]);

function updateAccountSettings() {
  userStore.updateAccountSettings();
}
</script>

<style scoped></style>
