<template>
  <div
    class="relative min-h-screen flex flex-col justify-center items-center background"
  >
    <RouterView />
    <FlexMenu class="fixed top-5 right-5 flex flex-col">
      <FloatingActionButton
        v-if="mobile"
        class="mb-4"
        :icon="handleMenuIcon"
        text="Menu"
        @click="showMenu = !showMenu"
      />
      <template v-if="!mobile || (mobile && showMenu)">
        <FloatingActionButton
          v-for="item in filteredMenuItems"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
          @click="handleMenuItemClick(item)"
          class="mb-4 transition-all ease-in-out duration-300"
          :class="{
            'shadow-white': item.to === useRoute().path,
            'shadow-4xl': item.to === useRoute().path,
            'text-gray-300': item.to !== useRoute().path,
            'hover:text-white': item.to !== useRoute().path,
          }"
        />
      </template>
    </FlexMenu>
  </div>
</template>

<script setup lang="ts">
import FloatingActionButton from "./components/FloatingActionButton.vue";
import FlexMenu from "./components/FlexMenu.vue";
import { computed, ref } from "vue";
import { useUserStore } from "./stores/user";
import router from "./router";
import { useRoute } from "vue-router";

const userStore = useUserStore();

// Try auto login
if (localStorage.getItem("token")) {
  userStore.autoLogin();
}

const showMenu = ref<boolean>(false);

const menuItems = computed(() => {
  return [
    {
      icon: "fas fa-right-to-bracket",
      text: "Log In",
      to: "/login",
      show: userStore.user.isAuthenticated === false,
    },
    {
      icon: "fas fa-right-from-bracket",
      text: "Log Out",
      to: "/log-out",
      show: userStore.user.isAuthenticated === true,
    },
    {
      icon: "fas fa-user-plus",
      text: "Sign Up",
      to: "/sign-up",
      show: userStore.user.isAuthenticated === false,
    },
    {
      icon: "fas fa-clock",
      text: "Hourslipper",
      to: "/",
      show: true,
    },
    {
      icon: "fas fa-user",
      text: "Account Settings",
      to: "/account",
      show: userStore.user.isAuthenticated === true,
    },
  ];
});

const filteredMenuItems = computed(() => {
  return menuItems.value.filter(item => {
    return item.show;
  });
});

const mobile = computed(() => {
  return window.innerWidth < 768;
});

const handleMenuIcon = computed(() => {
  return showMenu.value ? "fas fa-times" : "fas fa-bars";
});

function handleMenuItemClick(item: { to: string }) {
  if (item.to === "/log-out") {
    userStore.logout();
  } else {
    router.push(item.to);
  }
}
</script>

<style scoped></style>
