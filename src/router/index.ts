import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage.vue";
import LoginPage from "../views/LoginPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import AccountPage from "@/views/AccountPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpPage,
    },
    {
      path: "/account",
      name: "account",
      component: AccountPage,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
