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
  { id: "ticket", label: "Ticketing", icon: "ticket", to: "/ticketing" },
  {
    id: "DevGuide",
    label: "Developer Guide",
    icon: "clipboardClock",
    children: [
      { id: "guide", label: "Guide", to: "/guide" },
      { id: "ChangeLog", label: "Change Log", to: "/ChangeLog" },
    ],
  },
  {
    id: "mockup",
    label: "Mockup",
    icon: "layout",
    children: [
      { id: "aggrid", label: "AG Grid", to: "/aggrid" },
      { id: "OKRInitiatives", label: "OKR Initiatives", to: "/OKRInitiatives" },
    ],
  },
  {
    id: "componen",
    label: "Components",
    icon: "component",
    children: [
      { id: "button", label: "Button", to: "/button" },
      { id: "badge", label: "Badge", to: "/badge" },
      { id: "input", label: "Input", to: "/input" },
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
      { id: "table", label: "Table", to: "/table" },
      { id: "icon", label: "Icons", to: "/icon" },
    ],
  },
  {
    id: "users",
    label: "Management",
    icon: "users",
    children: [
      { id: "users-all", label: "User", to: "/users", exact: true },
      { id: "users-new", label: "Add User", to: "/users/new" },
    ],
  },
  { id: "companies", label: "Companies", icon: "clipboard", to: "/audit/logs" },
  { id: "settings", label: "Settings", icon: "settings", to: "/settings" },
];
