export type CompareTheme = "success" | "info" | "warning" | "primary" | "neutral";
export type CompareRole = "header" | "row" | "total";
export type CompareRowMeta = {
    compareBlock?: string;
    compareRole?: CompareRole;
    compareTheme?: CompareTheme;
};
export type CompareRowClassOptions = {
    defaultTheme?: CompareTheme;
};
export declare const createCompareRowClassRules: (options?: CompareRowClassOptions) => {
    "cmp-block": (p: any) => boolean;
    "cmp-role-header": (p: any) => boolean;
    "cmp-role-total": (p: any) => boolean;
    "cmp-theme-success": (p: any) => boolean;
    "cmp-theme-info": (p: any) => boolean;
    "cmp-theme-warning": (p: any) => boolean;
    "cmp-theme-primary": (p: any) => boolean;
    "cmp-theme-neutral": (p: any) => boolean;
};
