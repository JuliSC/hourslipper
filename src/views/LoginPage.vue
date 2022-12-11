<template>
  <div>
    <CardBase class="w-96">
      <template #header>
        <h1>Login</h1>
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
            title="Password"
            type="password"
            placeholder="Enter your email address"
            v-model="password"
          ></InputField>
        </div>
      </template>
      <template #footer>
        <div>
          <button @click="login()" class="btn mr-2">Login</button>
          <a class="underline text-blue-500 hover:" href="/"
            >Forgot password?</a
          >
        </div>
      </template>
    </CardBase>
  </div>
</template>

<script setup lang="ts">
import CardBase from "@/components/CardBase.vue";
import InputField from "@/components/InputField.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

// Stores
const userStore = useUserStore();

// Credentials
const email = ref<string>("");
const password = ref<string>("");

// Functions
function login() {
  userStore.login(email.value, password.value);
}
</script>

<style scoped></style>
