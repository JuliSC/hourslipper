<template>
  <form class="w-full md:w-96" action="POST" @submit.prevent="login()">
    <CardBase>
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
          <button type="submit" class="btn mr-2">Login</button>
          <!-- <a class="underline text-blue-500 hover:" href="/"
            >Forgot password?</a
          > -->
          <p class="text-xs mt-2">
            Don't have an account? Sign up
            <a
              href="/login"
              class="underline text-blue-500 hover:cursor-pointer"
              @click.prevent="$router.push('/sign-up')"
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
