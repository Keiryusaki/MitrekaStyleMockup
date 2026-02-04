/**
 * @mitreka/ui - AG Grid Theme Builder
 * Compatible with AG Grid v33+
 *
 * Usage:
 * import { agxTheme, agxThemeDark, buildAgxTheme } from '@mitreka/ui/themes/aggrid';
 * <AgGridVue :theme="isDark ? agxThemeDark : agxTheme" class="agx" />
 */
export type AgxDensity = 'compact' | 'cozy' | 'spacious';
export interface AgxThemeOptions {
    dark?: boolean;
    density?: AgxDensity;
    striped?: boolean;
}
/**
 * Build AG Grid theme with Mitreka styling
 */
export declare function buildAgxTheme(options?: AgxThemeOptions): import('ag-grid-community').Theme<import('ag-grid-community').ThemeDefaultParams>;
/**
 * Pre-built light theme
 */
export declare const agxTheme: import('ag-grid-community').Theme<import('ag-grid-community').ThemeDefaultParams>;
/**
 * Pre-built dark theme
 */
export declare const agxThemeDark: import('ag-grid-community').Theme<import('ag-grid-community').ThemeDefaultParams>;
declare const _default: {
    agxTheme: import('ag-grid-community').Theme<import('ag-grid-community').ThemeDefaultParams>;
    agxThemeDark: import('ag-grid-community').Theme<import('ag-grid-community').ThemeDefaultParams>;
    buildAgxTheme: typeof buildAgxTheme;
};
export default _default;
