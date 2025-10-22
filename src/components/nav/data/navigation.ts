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
  { id: "dash", label: "Dashboard", icon: "home", to: "/", exact: true },
  {
    id: "mockup",
    label: "Mockup",
    icon: "clipboard",
    children: [{ id: "aggrid", label: "AG Grid", to: "/aggrid" }],
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
