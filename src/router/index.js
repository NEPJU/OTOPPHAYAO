import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = sessionStorage.getItem("username");
    const isAdmin = sessionStorage.getItem("isAdmin") === "true"; // Assuming you store this as "true"/"false"

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        next({
          path: "/login",
          // query: { redirect: to.fullPath }, // Optional: redirect back to the intended route after login
        });
      } else {
        if (
          to.matched.some((record) => record.meta.requiresAdmin) &&
          !isAdmin
        ) {
          next({ path: "/" }); // Redirect to home if not an admin
        } else {
          next();
        }
      }
    } else {
      next(); // Make sure to always call next()
    }
  });

  return Router;
});
