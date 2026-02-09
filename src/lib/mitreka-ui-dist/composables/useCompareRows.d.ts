export type CompareTheme = "success" | "info" | "warning" | "primary" | "neutral" | "accent" | "secondary" | "error";
export type CompareRole = "header" | "row" | "total";
export type CompareRowMeta = {
    compareBlock?: string;
    compareRole?: CompareRole;
    compareTheme?: CompareTheme;
};
export type CompareRowClassOptions = {
    defaultTheme?: CompareTheme;
};
export type SpacerRowOptions = {
    rowType?: string;
    item?: string;
};
export type SpacerRowHeightOptions = {
    spacerHeight?: number;
    defaultHeight?: number;
    rowType?: string;
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
    "cmp-theme-accent": (p: any) => boolean;
    "cmp-theme-secondary": (p: any) => boolean;
    "cmp-theme-error": (p: any) => boolean;
};
export declare const createSpacerRow: (options?: SpacerRowOptions) => {
    rowType: string;
    item: string;
};
export declare const createSpacerRowClassRules: (rowType?: string) => {
    "cmp-row-spacer": (p: any) => boolean;
};
export declare const createSpacerRowHeight: (options?: SpacerRowHeightOptions) => (params: any) => number;
