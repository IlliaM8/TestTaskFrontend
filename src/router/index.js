import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/authModule.js";
import Main from "@/pages/Main.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import User from "@/pages/User.vue";
import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Main,
      meta: { requiredAuth: true },
      name: "Main",
    },
    {
      path: "/login",
      component: Login,
      meta: { requiredAuth: false },
      name: "Login",
    },
    {
      path: "/register",
      component: Register,
      meta: { requiredAuth: false },
      name: "Register",
    },
    {
      path: "/user/:id",
      component: User,
      meta: { requiredAuth: true },
      name: "User",
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuth = store.state.isAuth;
  try {
    if (to.matched.some((rec) => rec.meta.requiredAuth)) {
      if (localStorage.getItem("isAuth")) {
        next();
      } else {
        router.push("/login");
      }
    } else {
      next();
    }
  } catch (error) {}
});

export default router;
