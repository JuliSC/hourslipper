import { Settings } from "@/interfaces/Settings";
import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";

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
  getters: {},
  actions: {
    signUp(email: string, username: string, password: string) {
      axios("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        data: {
          username,
          email,
          password,
          isAdmin: false,
        },
      }).then(res => {
        this.setUserCredentials(res.data);
        router.push("/");
      });
    },
    login(email: string, password: string) {
      axios("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        data: {
          email,
          password,
        },
      })
        .then(res => {
          console.log(res);

          this.setUserCredentials(res.data);
          router.push("/");
        })
        .catch(err => {
          alert("Invalid credentials");
        });
    },
    autoLogin() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      axios("http://localhost:3000/auth/verify", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": true,
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (token && user) {
            this.user = JSON.parse(user);
            this.user.isAuthenticated = true;
          }
        })
        .catch(err => {
          this.logout();
          alert("Invalid credentials");
        });
    },
    logout() {
      this.user = userDefaults;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    },
    setUserCredentials(credentials: { user: User; accessToken: string }) {
      console.log(credentials);

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
    updateAccountSettings() {
      axios(`http://localhost:3000/users/settings`, {
        method: "PATCH",
        headers: {
          "Access-Control-Allow-Origin": true,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          ...this.user.settings,
        },
      }).then(res => {
        localStorage.setItem("user", JSON.stringify(this.user));
      });
    },
  },
});
