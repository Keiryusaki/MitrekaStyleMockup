// src/router/index.ts
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import Dashboard from "@/pages/Dashboard.vue";
import { useLoadingStore } from "@/stores/loading";

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
    path: "/aggrid",
    component: () => import("@/pages/Aggrid/AGGridDemo.vue"),
  },
  {
    path: "/project-budgeting",
    component: () => import("@/pages/Aggrid/ProjectBudgeting.vue"),
    meta: { hideBreadcrumbs: true },
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
    path: "/datetime-picker",
    component: () => import("@/pages/DateTimePicker/DateTimePicker.vue"),
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
    path: "/collapse",
    component: () => import("@/pages/Collapse/Collapse.vue"),
  },
  {
    path: "/accordion",
    component: () => import("@/pages/Accordion/Accordion.vue"),
  },
  {
    path: "/avatar",
    component: () => import("@/pages/Avatar/Avatar.vue"),
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
  {
    path: "/pageheader",
    component: () => import("@/pages/PageHeader/PageHeader.vue"),
  },
  {
    path: "/forms/basic",
    component: () => import("@/pages/Forms/BasicForm.vue"),
  },
  {
    path: "/forms/multi-step",
    component: () => import("@/pages/Forms/MultiStepForm.vue"),
  },
  {
    path: "/button-usage",
    component: () => import("@/pages/ButtonUsage/ButtonUsage.vue"),
  },
  {
    path: "/tooltip",
    component: () => import("@/pages/Tooltip/Tooltip.vue"),
  },
  {
    path: "/auth/signin",
    component: () => import("@/pages/Auth/SignIn.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/auth/forgot",
    component: () => import("@/pages/Auth/ForgotPassword.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/auth/reset",
    component: () => import("@/pages/Auth/ResetPassword.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/auth/register",
    component: () => import("@/pages/Auth/Register.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/patterns/empty",
    component: () => import("@/pages/Patterns/EmptyStates.vue"),
  },
  {
    path: "/patterns/error",
    component: () => import("@/pages/Patterns/ErrorPages.vue"),
  },
  {
    path: "/settings/profile",
    component: () => import("@/pages/Settings/Profile.vue"),
  },
  {
    path: "/notifications",
    component: () => import("@/pages/Notifications/Notifications.vue"),
  },
   {
     path: "/tabs",
     component: () => import("@/pages/Tabs/Tabs.vue"),
   },
   {
     path: "/progress",
     component: () => import("@/pages/Progress/Progress.vue"),
   },
   {
     path: "/timeline",
     component: () => import("@/pages/Timeline/Timeline.vue"),
   },
   {
     path: "/file-upload",
     component: () => import("@/pages/FileUpload/FileUpload.vue"),
   },
   {
     path: "/skeleton",
     component: () => import("@/pages/Skeleton/Skeleton.vue"),
   },
   {
     path: "/alert",
     component: () => import("@/pages/Alert/Alert.vue"),
   },
];

const router = createRouter({
  // penting: pakai base dari Vite, supaya path jadi /MitrekaStyleMockup/ di GH Pages
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Kalo ada saved position (misal back button), pake itu
    if (savedPosition) {
      return savedPosition;
    }
    // Kalo ada hash (anchor link), scroll ke element tersebut
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    // Default: scroll ke atas
    return { top: 0 };
  },
});

// Navigation guard: tampilkan block UI SEBELUM navigasi
router.beforeEach((to, from, next) => {
  // Skip jika navigasi ke halaman yang sama
  if (to.path !== from.path) {
    const loading = useLoadingStore();
    loading.startNav("Memuat halaman…");
  }
  next();
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · Admin` : "Admin";
  
  // Delay 1.5 detik setelah navigasi selesai baru hide block UI
  setTimeout(() => {
    const loading = useLoadingStore();
    loading.stopNav();
  }, 1500);
});

export default router;
