// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Dashboard from "@/pages/Dashboard.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: { title: "Dashboard", icon: "home" },
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/Users/List.vue"),
    meta: { title: "Users", icon: "users" },
  },
  {
    path: "/users/:id",
    name: "user-edit",
    component: () => import("@/pages/Users/Edit.vue"),
    meta: { title: "Edit User", parent: "users" },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/pages/Settings/Index.vue"),
    meta: { title: "Settings", icon: "settings" },
  },
  {
    path: "/audit/logs",
    name: "audit-logs",
    component: () => import("@/pages/Audit/Logs.vue"),
    meta: { title: "Audit Logs", icon: "clipboard" },
  },
  {
    path: "/aggrid",
    name: "aggrid",
    component: () => import("@/pages/Aggrid/AGGridDemo.vue"),
    meta: { title: "AG Grid", icon: "clipboard" },
  },
  {
    path: "/button",
    name: "button",
    component: () => import("@/pages/Buttons/Buttons.vue"),
    meta: { title: "Button", icon: "clipboard" },
  },
  {
    path: "/badge",
    name: "badge",
    component: () => import("@/pages/Badge/Badge.vue"),
    meta: { title: "Badge", icon: "clipboard" },
  },
  {
    path: "/input",
    name: "input",
    component: () => import("@/pages/Input/Input.vue"),
    meta: { title: "Input", icon: "clipboard" },
  },
  {
    path: "/SelectionControls",
    name: "SelectionControls",
    component: () => import("@/pages/SelectionControls/SelectionControls.vue"),
    meta: { title: "Selection Control", icon: "clipboard" },
  },
];

const router = createRouter({
  // penting: pakai base dari Vite, supaya path jadi /MitrekaStyleMockup/ di GH Pages
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · Admin` : "Admin";
});

export default router;
