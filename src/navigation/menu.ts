// src/navigation/menu.ts
export type MenuItem = {
  key: string
  label: string
  icon?: string
  to?: string
  children?: MenuItem[]
}

export const menu: MenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'ri-home-5-line', to: '/dashboard' },
  {
    key: 'mgmt', label: 'Management', icon: 'ri-briefcase-line',
    children: [
      { key: 'user', label: 'User', to: '/management/user' },
      { key: 'add-user', label: 'Add User', to: '/management/add-user' },
    ],
  },
  { key: 'companies', label: 'Companies', icon: 'ri-building-4-line', to: '/companies' },
  { key: 'ag-grid', label: 'AG Grid', icon: 'ri-clipboard-line', to: '/aggrid' },
  { key: 'project-cashflow', label: 'Project Cashflow', icon: 'ri-money-dollar-circle-line', to: '/project-cashflow' },
  { key: 'settings', label: 'Settings', icon: 'ri-settings-3-line', to: '/settings' },
]
