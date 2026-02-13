type AgxDensity = "compact" | "cozy" | "spacious";
export declare const resolveAgFontPx: (el?: HTMLElement | null) => number;
export declare const calcAgRowHeight: (fontPx: number, density: AgxDensity) => number;
export declare const calcAgHeaderHeight: (density: AgxDensity) => 30 | 52 | 44;
export declare const calcAgGroupHeaderHeight: (density: AgxDensity) => 24 | 48 | 40;
export {};
