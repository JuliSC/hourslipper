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
        <FormValidators
          class="mt-4"
          :errors="validationErrors"
        ></FormValidators>
      </template>
      <template #footer>
        <div>
          <button
            :class="{ disabled: validationErrors.length > 0 }"
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
              @click.prevent="$router.push('/login')"
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

// Stores
const userStore = useUserStore();

// Credentials
const email = ref<string>("");
const username = ref<string>("");
const password = ref<string>("");
const passwordConfirmation = ref<string>("");

// Validation
function validateEmail(email: string) {
  const errors: Array<string> = [];
  if (!email) {
    errors.push("Email is required");
  }

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(String(email).toLowerCase())) {
    errors.push("Please enter a valid email address");
  }
  return errors;
}

function validatePassword(password: string) {
  const errors: Array<string> = [];
  if (!password) {
    errors.push("Password is required");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  return errors;
}

function validatePasswordConfirmation(passwordConfirmation: string) {
  const errors: Array<string> = [];
  if (!passwordConfirmation) {
    errors.push("Password confirmation is required");
  }

  if (!passwordConfirmation || passwordConfirmation !== password.value) {
    errors.push("Passwords must match");
  }
  return errors;
}

function validateUsername(username: string) {
  const errors: Array<string> = [];
  if (!username) {
    errors.push("Username is required");
  }

  if (username.length < 3) {
    errors.push("Username must be at least 3 characters");
  }
  return errors;
}

const validationErrors = computed(() => {
  return [
    ...validateEmail(email.value),
    ...validateUsername(username.value),
    ...validatePassword(password.value),
    ...validatePasswordConfirmation(passwordConfirmation.value),
  ];
});

function signUp() {
  userStore.signUp(email.value, username.value, password.value);
}
</script>

<style scoped></style>
