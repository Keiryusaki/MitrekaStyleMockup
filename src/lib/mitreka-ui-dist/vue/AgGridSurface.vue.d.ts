import { GridReadyEvent } from 'ag-grid-community';

type Density = 'compact' | 'cozy' | 'spacious';
type ThemeMode = 'auto' | 'light' | 'dark';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    density?: Density;
    striped?: boolean;
    themeMode?: ThemeMode;
    autoObserveTheme?: boolean;
    autoRowHeight?: boolean;
    pinnedShadows?: boolean;
}>, {
    density: string;
    striped: boolean;
    themeMode: string;
    autoObserveTheme: boolean;
    autoRowHeight: boolean;
    pinnedShadows: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "grid-ready": (params: GridReadyEvent<any, any>) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    density?: Density;
    striped?: boolean;
    themeMode?: ThemeMode;
    autoObserveTheme?: boolean;
    autoRowHeight?: boolean;
    pinnedShadows?: boolean;
}>, {
    density: string;
    striped: boolean;
    themeMode: string;
    autoObserveTheme: boolean;
    autoRowHeight: boolean;
    pinnedShadows: boolean;
}>>> & Readonly<{
    "onGrid-ready"?: ((params: GridReadyEvent<any, any>) => any) | undefined;
}>, {
    density: Density;
    striped: boolean;
    themeMode: ThemeMode;
    autoObserveTheme: boolean;
    autoRowHeight: boolean;
    pinnedShadows: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
