<template>
  <form
    class="w-full md:w-1/2"
    action="POST"
    @submit.prevent="updateUserDefaults()"
  >
    <CardBase>
      <template #header>
        <h1>Hourslipper Settings</h1>
      </template>
      <template #subheader>
        <p class="text-sm">Your defaults for time entries</p>
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
  <form
    class="w-full md:w-1/2"
    action="POST"
    @submit.prevent="updateUserCredentials()"
  >
    <CardBase>
      <template #header>
        <h1>Account Settings</h1>
      </template>
      <template #subheader>
        <p class="text-sm">Manage your account settings!</p>
      </template>
      <template #body>
        <div class="mt-4">
          <InputField
            title="Email"
            type="text"
            placeholder="Enter your toggl API key"
            v-model="email"
          ></InputField>
        </div>
        <div class="mt-4">
          <InputField
            title="Username"
            type="text"
            placeholder="Enter your toggl API key"
            v-model="username"
          ></InputField>
        </div>
        <FormValidators class="mt-4" :validities="validities"></FormValidators>
      </template>
      <template #footer>
        <div>
          <button
            :class="{ disabled: !formValid }"
            type="submit"
            class="btn mr-2"
          >
            Save
          </button>
        </div>
      </template>
    </CardBase>
  </form>
  <form class="w-full md:w-1/2" action="POST" @submit.prevent="deleteAccount()">
    <CardBase>
      <template #header>
        <h1>Delete Account</h1>
      </template>
      <template #subheader>
        <p class="text-sm">Delete your account</p>
      </template>
      <template #body>
        <div class="mt-4">
          <p class="text-sm">
            This will delete your account and all associated data. This action
            is irreversible.
          </p>
        </div>
        <div class="mt-4">
          <p class="text-sm">
            To confirm, please enter your username
            <b>{{ userStore.user.username }}</b> below.
          </p>
          <InputField
            type="text"
            placeholder="Enter username as shown above"
            v-model="deleteConfirmationUsername"
          ></InputField>
        </div>
      </template>
      <template #footer>
        <div>
          <button
            :class="{
              disabled: deleteConfirmationUsername !== userStore.user.username,
            }"
            type="submit"
            class="btn danger bg- mr-2"
          >
            Delete
          </button>
        </div>
      </template>
    </CardBase>
  </form>
</template>

<script setup lang="ts">
import CardBase from "@/components/CardBase.vue";
import InputField from "@/components/InputField.vue";
import SelectField from "@/components/SelectField.vue";
import FormValidators from "@/components/FormValidators.vue";
import { useUserStore } from "@/stores/user";
import { validateEmail, validateUsername } from "@/utils/Validator";
import { computed, ref, watchEffect } from "vue";
const userStore = useUserStore();

const email = ref<string>("");
const username = ref<string>("");
const deleteConfirmationUsername = ref<string>("");

watchEffect(() => {
  email.value = userStore.user.email;
  username.value = userStore.user.username;
});

// Validation
const validities = computed(() => {
  return [...validateEmail(email.value), ...validateUsername(username.value)];
});

const formValid = computed(() => {
  return (
    validities.value.filter(validity => {
      return validity.valid === false;
    }).length === 0
  );
});

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

function updateUserDefaults() {
  userStore.updateUserDefaults();
}

function updateUserCredentials() {
  userStore.updateUserCredentials(email.value, username.value);
}

function deleteAccount() {
  userStore.deleteAccount();
}
</script>

<style scoped></style>
