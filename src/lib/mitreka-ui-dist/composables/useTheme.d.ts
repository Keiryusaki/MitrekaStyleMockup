/**
 * @mitreka/ui - Theme Composable
 * Manage light/dark theme switching
 */
export type ThemeMode = 'light' | 'dark' | 'system';
export declare function useTheme(defaultMode?: ThemeMode): {
    mode: import('vue').Ref<ThemeMode, ThemeMode>;
    isDark: import('vue').Ref<boolean, boolean>;
    setTheme: (newMode: ThemeMode) => void;
    toggleTheme: () => void;
};
