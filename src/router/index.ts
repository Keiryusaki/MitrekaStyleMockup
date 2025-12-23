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
    component: Dashboard,
  },
  {
    path: "/ticketing",
    component: () => import("@/pages/Ticketing/Ticketing.vue"),
    meta: {
      name: "public-ticketing",
      publicTicket: true,
    },
  },
  {
    path: "/users",
    component: () => import("@/pages/Users/List.vue"),
  },
  {
    path: "/users/:id",
    component: () => import("@/pages/Users/Edit.vue"),
  },
  {
    path: "/settings",
    component: () => import("@/pages/Settings/Index.vue"),
  },
  {
    path: "/audit/logs",
    component: () => import("@/pages/Audit/Logs.vue"),
  },
  {
    path: "/aggrid",
    component: () => import("@/pages/Aggrid/AGGridDemo.vue"),
  },
  {
    path: "/button",
    component: () => import("@/pages/Buttons/Buttons.vue"),
  },
  {
    path: "/badge",
    component: () => import("@/pages/Badge/Badge.vue"),
  },
  {
    path: "/input",
    component: () => import("@/pages/Input/Input.vue"),
  },
  {
    path: "/SelectOption",
    component: () => import("@/pages/SelectOption/SelectOption.vue"),
  },
  {
    path: "/SelectionControls",
    component: () => import("@/pages/SelectionControls/SelectionControls.vue"),
  },
  {
    path: "/icon",
    component: () => import("@/pages/Icons/Icons.vue"),
  },
  {
    path: "/ChangeLog",
    component: () => import("@/pages/Changelog/Changelog.vue"),
  },
  {
    path: "/guide",
    component: () => import("@/pages/DevGuide/DevGuide.vue"),
  },
  {
    path: "/OKRInitiatives",
    component: () => import("@/pages/OKRInitiatives/OKRInitiatives.vue"),
  },
  {
    path: "/table",
    component: () => import("@/pages/Table/Table.vue"),
  },
  {
    path: "/modal",
    component: () => import("@/pages/Modal/Modal.vue"),
  },
  {
    path: "/toasts",
    component: () => import("@/pages/Toasts/Toasts.vue"),
  },
  {
    path: "/breadcrumbs",
    component: () => import("@/pages/Breadcrumbs/Breadcrumbs.vue"),
  },
  {
    path: "/loading",
    component: () => import("@/pages/Loading/Loading.vue"),
  },
  {
    path: "/statcard",
    component: () => import("@/pages/StatCard/StatCard.vue"),
  },
  {
    path: "/card",
    component: () => import("@/pages/Card/Card.vue"),
  },
  {
    path: "/pagination",
    component: () => import("@/pages/Pagination/Pagination.vue"),
  },
  {
    path: "/datatable",
    component: () => import("@/pages/DataTable/DataTable.vue"),
  },
  {
    path: "/themeswitcher",
    component: () => import("@/pages/ThemeSwitcher/ThemeSwitcher.vue"),
  },
  {
    path: "/sidebar",
    component: () => import("@/pages/Sidebar/Sidebar.vue"),
  },
  {
    path: "/colors",
    component: () => import("@/pages/Colors/Colors.vue"),
  },
  {
    path: "/typography",
    component: () => import("@/pages/Typography/Typography.vue"),
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
