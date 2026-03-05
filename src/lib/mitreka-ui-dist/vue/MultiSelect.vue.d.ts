import { SelectOption } from '../composables/useSelect';

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type DisplayMode = "stacked" | "inline-compact";
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: Array<string | number>;
    options?: SelectOption[];
    fetchOptions?: (q: string) => Promise<SelectOption[]>;
    debounceMs?: number;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    displayMode?: DisplayMode;
}>, {
    displayMode: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: Array<string | number>;
    options?: SelectOption[];
    fetchOptions?: (q: string) => Promise<SelectOption[]>;
    debounceMs?: number;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    displayMode?: DisplayMode;
}>, {
    displayMode: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    displayMode: DisplayMode;
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
