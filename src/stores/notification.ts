import { WebNotification, WebNotificationWithID } from "@/@types/Notification";
import { defineStore } from "pinia";

let nextId = 0;

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({
    notifications: [] as WebNotificationWithID[],
    status: false,
  }),
  actions: {
    add(notification: WebNotification) {
      this.notifications.push({
        ...notification,
        id: nextId++,
      });
    },
    remove(notification: WebNotificationWithID) {
      this.notifications = this.notifications.filter(
        n => n.id !== notification.id,
      );
    },
  },
});
