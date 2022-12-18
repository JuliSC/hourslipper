<template>
  <div
    class="my-4 px-0 pr-0 pl-5 bg-component-background text-white border-l-8 rounded shadow-md text-lg flex relative justify-between bg-clip-padding items-stretch transition-all ease-in-out duration-300"
    :class="[showNotification, notificationTypeClass.border]"
  >
    <p class="py-4">{{ notification.message }}</p>
    <button
      @click="remove(notification)"
      :class="[notificationTypeClass.bg]"
      class="w-8 text-lg text-white font-bold text-center border-none rounded-tr rounded-br rounded-tl-none rounded-bl-none cursor-pointer ml-5 mr-0 my-0"
    >
      <font-awesome-icon class="text-xl" icon="fas fa-times" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { WebNotificationWithID } from "@/@types/Notification";
import { useNotificationStore } from "@/stores/notification";
import { computed, onMounted, onUnmounted, PropType, ref } from "vue";

const notificationStore = useNotificationStore();

const props = defineProps({
  notification: {
    type: Object as PropType<WebNotificationWithID>,
    required: true,
  },
});

const showNotification = computed(() => {
  return show.value ? "left-0" : "";
});

const notificationTypeClass = computed(() => {
  switch (props.notification.type) {
    case "success":
      return {
        bg: "bg-green-500",
        border: "border-green-500",
      };
    case "error":
      return {
        bg: "bg-red-500",
        border: "border-red-500",
      };
    default:
      return {
        bg: "bg-blue-500",
        border: "border-blue-500",
      };
  }
});

const timeout = ref<any>(null);
const show = ref<boolean>(false);

function remove(notification: WebNotificationWithID) {
  notificationStore.remove(notification);
}

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 50);

  timeout.value = setTimeout(() => remove(props.notification), 5000);
});

onUnmounted(() => {
  clearTimeout(timeout.value);
});
</script>
