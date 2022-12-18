<template>
  <div
    class="fixed z-50 bottom-0 right-0 left-0 mx-auto md:left-auto px-3 md:pr-14"
  >
    <NotificationBar
      v-for="notification in notificationStore.notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification";
import NotificationBar from "./NotificationBar.vue";

const notificationStore = useNotificationStore();
</script>
