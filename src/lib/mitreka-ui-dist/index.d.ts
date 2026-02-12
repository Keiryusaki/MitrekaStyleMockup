/**
 * @mitreka/ui
 * Mitreka UI Component Library
 *
 * CSS-first design system with optional Vue components
 *
 * Usage:
 *
 * CSS Only:
 *   @import '@mitreka/ui/css';
 *   // or individual components
 *   @import '@mitreka/ui/css/components/button.css';
 *
 * Vue Components:
 *   import { Button, Badge, Card, Modal } from '@mitreka/ui/vue';
 *   import { AgGridSurface } from '@mitreka/ui/vue';
 *
 * Composables:
 *   import { useSelectSingle, useTheme } from '@mitreka/ui/composables';
 *
 * AG Grid Theme:
 *   import { agxTheme, agxThemeDark } from '@mitreka/ui/themes/aggrid';
 *
 * AG Grid Wrapper:
 *   import '@mitreka/ui/css/plugins/aggrid.css';
 *   <AgGridSurface :rowData="rows" :columnDefs="cols" density="cozy" />
 */
export * from './composables';
export * from './vue';
export * from './themes/aggrid';
export * from './icons';
