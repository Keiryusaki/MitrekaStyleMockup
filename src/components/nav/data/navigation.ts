export type IconName =
  | "home"
  | "users"
  | "settings"
  | "clipboard"
  | "chevron-right"
  | "chevron-left"
  | "dot";

// Tipe NavItem
export type NavItem = {
  id: string;
  label: string;
  icon?: IconName;
  to?: string;
  children?: NavItem[];
  exact?: boolean;
};

// Data Navigasi
export const NAV: NavItem[] = [
  { id: "dash", label: "Dashboard", icon: "dashboard", to: "/", exact: true },
  {
    id: "DevGuide",
    label: "Developer Guide",
    icon: "clipboardClock",
    children: [
      { id: "guide", label: "Guide", to: "/guide" },
      { id: "button-usage", label: "Button Usage", to: "/button-usage" },
      { id: "ChangeLog", label: "Change Log", to: "/ChangeLog" },
    ],
  },
  {
    id: "mockup",
    label: "Mockup Pages",
    icon: "layout",
    children: [
      { id: "ticket", label: "Ticketing", to: "/ticketing" },
      { id: "aggrid", label: "AG Grid", to: "/aggrid" },
      { id: "project-budgeting", label: "Project Budgeting", to: "/project-budgeting" },
      { id: "project-cashflow", label: "Project Cashflow", to: "/project-cashflow" },
      { id: "OKRInitiatives", label: "OKR Initiatives", to: "/OKRInitiatives" },
    ],
  },
  {
    id: "componen",
    label: "Components",
    icon: "component",
    children: [
      { id: "colors", label: "Colors", to: "/colors" },
      { id: "typography", label: "Typography", to: "/typography" },
      { id: "button", label: "Button", to: "/button" },
      { id: "badge", label: "Badge", to: "/badge" },
      { id: "input", label: "Input", to: "/input" },
      { id: "datetime-picker", label: "Date & Time Picker", to: "/datetime-picker" },
      {
        id: "SelectOption",
        label: "Select Option",
        to: "/SelectOption",
      },
      {
        id: "SelectionControls",
        label: "Selection Controls",
        to: "/SelectionControls",
      },
      { id: "card", label: "Card", to: "/card" },
      { id: "collapse", label: "Collapse", to: "/collapse" },
      { id: "accordion", label: "Accordion", to: "/accordion" },
      { id: "avatar", label: "Avatar", to: "/avatar" },
      { id: "table", label: "Table", to: "/table" },
      { id: "datatable", label: "DataTable", to: "/datatable" },
      { id: "modal", label: "Modal", to: "/modal" },
      { id: "toasts", label: "Toasts", to: "/toasts" },
      { id: "breadcrumbs", label: "Breadcrumbs", to: "/breadcrumbs" },
      { id: "loading", label: "Loading", to: "/loading" },
      { id: "statcard", label: "StatCard", to: "/statcard" },
      { id: "pagination", label: "Pagination", to: "/pagination" },
      { id: "sidebar", label: "Sidebar & Nav", to: "/sidebar" },
      { id: "icon", label: "Icons", to: "/icon" },
      { id: "pageheader", label: "PageHeader", to: "/pageheader" },
      { id: "tooltip", label: "Tooltip", to: "/tooltip" },
       { id: "tabs", label: "Tabs", to: "/tabs" },
       { id: "progress", label: "Progress & Steps", to: "/progress" },
       { id: "timeline", label: "Timeline", to: "/timeline" },
       { id: "file-upload", label: "File Upload", to: "/file-upload" },
       { id: "skeleton", label: "Skeleton", to: "/skeleton" },
       { id: "alert", label: "Alert & Banner", to: "/alert" },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    icon: "settings",
    children: [
      { id: "themeswitcher", label: "Theme Switcher", to: "/themeswitcher" },
      { id: "theme-builder", label: "Theme Builder", to: "/theme-builder" },
      { id: "theme-builder-docs", label: "Theme Builder Docs", to: "/theme-builder-docs" },
    ],
  },
  {
    id: "forms",
    label: "Form Layouts",
    icon: "formInput",
    children: [
      { id: "form-basic", label: "Basic Form", to: "/forms/basic" },
      { id: "form-multi-step", label: "Multi-Step", to: "/forms/multi-step" },
    ],
  },
  {
    id: "auth",
    label: "Auth Pages",
    icon: "lock",
    children: [
      { id: "auth-signin", label: "Sign In", to: "/auth/signin" },
      { id: "auth-register", label: "Register", to: "/auth/register" },
      { id: "auth-forgot", label: "Forgot Password", to: "/auth/forgot" },
      { id: "auth-reset", label: "Reset Password", to: "/auth/reset" },
    ],
  },
  {
    id: "patterns",
    label: "UI Patterns",
    icon: "puzzle",
    children: [
      { id: "pattern-empty", label: "Empty States", to: "/patterns/empty" },
      { id: "pattern-error", label: "Error Pages", to: "/patterns/error" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    children: [
      { id: "settings-profile", label: "Profile Settings", to: "/settings/profile" },
      { id: "notifications", label: "Notifications", to: "/notifications" },
    ],
  },
];
