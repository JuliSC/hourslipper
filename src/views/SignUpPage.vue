<template>
  <form class="w-full md:w-96" action="POST" @submit.prevent="signUp()">
    <CardBase>
      <template #header>
        <h1>Sign Up</h1>
      </template>
      <template #body>
        <div class="mt-4">
          <InputField
            title="Email address"
            placeholder="Enter your email address"
            v-model="email"
          ></InputField>
        </div>
        <div class="mt-4">
          <InputField
            title="Username"
            placeholder="Enter your username"
            v-model="username"
          ></InputField>
        </div>
        <div class="mt-4">
          <InputField
            title="Password"
            type="password"
            placeholder="Enter your password"
            v-model="password"
          ></InputField>
        </div>
        <div class="mt-4">
          <InputField
            title="Password confirmation"
            type="password"
            placeholder="Enter your password again"
            v-model="passwordConfirmation"
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
            Sign Up
          </button>
          <p class="text-xs mt-2">
            Already have an account? Log in
            <a
              href="/login"
              class="underline text-blue-500 hover:cursor-pointer"
              @click.prevent="$router.push('login')"
              >here</a
            >
          </p>
        </div>
      </template>
    </CardBase>
  </form>
</template>

<script setup lang="ts">
import CardBase from "@/components/CardBase.vue";
import InputField from "@/components/InputField.vue";
import FormValidators from "@/components/FormValidators.vue";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateUsername,
} from "@/utils/Validator";

// Stores
const userStore = useUserStore();

// Credentials
const email = ref<string>("");
const username = ref<string>("");
const password = ref<string>("");
const passwordConfirmation = ref<string>("");

// Validation
const validities = computed(() => {
  return [
    ...validateEmail(email.value),
    ...validateUsername(username.value),
    ...validatePassword(password.value),
    ...validatePasswordConfirmation(passwordConfirmation.value, password.value),
  ];
});

const formValid = computed(() => {
  return (
    validities.value.filter(validity => {
      return validity.valid === false;
    }).length === 0
  );
});

function signUp() {
  userStore.signUp(email.value, username.value, password.value);
}
</script>

<style scoped></style>
