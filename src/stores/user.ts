import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {
      username: "",
      email: "",
      isAuthenticated: false,
    },
  }),
  getters: {},
  actions: {
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
      }).then(res => {
        this.user.email = res.data.user.email;
        this.user.username = res.data.user.username;
        this.user.isAuthenticated = true;

        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
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
            this.user.email = JSON.parse(user).email;
            this.user.username = JSON.parse(user).username;
            this.user.isAuthenticated = true;
          }
        })
        .catch(err => {
          this.logout();
        });
    },
    logout() {
      this.user.email = "";
      this.user.username = "";
      this.user.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
