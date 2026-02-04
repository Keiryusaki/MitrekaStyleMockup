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

export const createCompareRowClassRules = (
  options: CompareRowClassOptions = {}
) => {
  const defaultTheme = options.defaultTheme ?? "success";
  const resolveTheme = (p: any): CompareTheme | undefined =>
    p.data?.compareTheme ?? defaultTheme;

  return {
    "cmp-block": (p: any) => !!p.data?.compareBlock,
    "cmp-role-header": (p: any) => p.data?.compareRole === "header",
    "cmp-role-total": (p: any) => p.data?.compareRole === "total",
    "cmp-theme-success": (p: any) =>
      !!p.data?.compareBlock && resolveTheme(p) === "success",
    "cmp-theme-info": (p: any) =>
      !!p.data?.compareBlock && resolveTheme(p) === "info",
    "cmp-theme-warning": (p: any) =>
      !!p.data?.compareBlock && resolveTheme(p) === "warning",
    "cmp-theme-primary": (p: any) =>
      !!p.data?.compareBlock && resolveTheme(p) === "primary",
    "cmp-theme-neutral": (p: any) =>
      !!p.data?.compareBlock && resolveTheme(p) === "neutral",
  };
};
