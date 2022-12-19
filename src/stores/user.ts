import { Settings } from "@/@types/Settings";
import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";
import { useNotificationStore } from "./notification";

const userDefaults = {
  username: "",
  email: "",
  isAuthenticated: false,
  settings: {
    apiKey: "",
    hoursAppend: "",
    dateHeader: "",
    hoursHeader: "",
    dateFormat: {
      name: "",
      value: "",
    },
    separator: "",
    weekdayFormat: {
      name: "",
      value: "",
    },
    language: {
      name: "",
      value: "",
    },
  },
};

type User = {
  username: string;
  email: string;
  settings: Settings;
};

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      username: "",
      email: "",
      isAuthenticated: false,
      settings: {
        apiKey: "",
        hoursAppend: "",
        dateHeader: "",
        hoursHeader: "",
        dateFormat: {
          name: "DD-MM-YYYY",
          value: "en-UK",
        },
        separator: "",
        weekdayFormat: {
          name: "Not included",
          value: "none",
        },
        language: {
          name: "English",
          value: "en-US",
        },
      },
    },
  }),
  getters: {
    notificationStore() {
      return useNotificationStore();
    },
    getUser(): User {
      return this.user;
    },
  },
  actions: {
    signUp(email: string, username: string, password: string) {
      axios("/api/users", {
        method: "POST",
        data: {
          username,
          email,
          password,
          isAdmin: false,
        },
      })
        .then(res => {
          this.setUserCredentials(res.data);
          router.push("home");
          this.notificationStore.add({
            message: `Welcome ${this.user.username}! 👋`,
            type: "success",
          });
        })
        .catch(err => {
          this.notificationStore.add({
            message: `Something went wrong. Please try again 🤔`,
            type: "error",
          });
        });
    },
    login(email: string, password: string) {
      axios("/api/auth/login", {
        method: "POST",
        data: {
          email,
          password,
        },
      })
        .then(res => {
          this.setUserCredentials(res.data);
          this.notificationStore.add({
            message: `Welcome back ${this.user.username}! 👋`,
            type: "success",
          });
          router.push("home");
        })
        .catch(err => {
          this.notificationStore.add({
            message: "Invalid credentials. Please try again 🔐",
            type: "error",
          });
        });
    },
    autoLogin() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      axios("/api/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (token && user) {
            this.user = JSON.parse(user);
            this.user.isAuthenticated = true;
            this.notificationStore.add({
              message: `Welcome back ${this.user.username}! 👋`,
              type: "success",
            });
          }
        })
        .catch(err => {
          this.removeUserCredentials();
          this.notificationStore.add({
            message: `Session expired. Please log in again 🔑`,
            type: "error",
          });
        });
    },
    logout() {
      this.removeUserCredentials();
      this.notificationStore.add({
        message: `Hope to see you again soon! 👋`,
        type: "success",
      });
    },
    setUserCredentials(credentials: { user: User; accessToken: string }) {
      const user: User = {
        email: credentials.user.email,
        username: credentials.user.username,
        settings: credentials.user.settings,
      };

      this.user.email = user.email;
      this.user.username = user.username;
      this.user.settings = user.settings;

      if (this.user.email && this.user.username) {
        this.user.isAuthenticated = true;
      }

      localStorage.setItem("token", credentials.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeUserCredentials() {
      this.user = userDefaults;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("login");
    },
    updateUserDefaults() {
      axios(`/api/users/settings`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          ...this.user.settings,
        },
      }).then(res => {
        localStorage.setItem("user", JSON.stringify(this.user));
        this.notificationStore.add({
          message: `Settings saved successfully! 🎉`,
          type: "success",
        });
      });
    },
    updateUserCredentials(email: string, username: string) {
      axios("/api/users/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          email: email,
          username: username,
        },
      })
        .then(res => {
          this.user.email = email;
          this.user.username = username;
          localStorage.setItem("user", JSON.stringify(this.user));
          this.notificationStore.add({
            message: `Credentials updated successfully! 🎉`,
            type: "success",
          });
        })
        .catch(err => {
          this.notificationStore.add({
            message: `Something went wrong. Please try again 🤔`,
            type: "error",
          });
        });
    },
    deleteAccount() {
      axios("/api/users/", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(res => {
        this.removeUserCredentials();
        this.notificationStore.add({
          message: `Account deleted. Hope to see you again 😢`,
          type: "success",
        });
      });
    },
  },
});
