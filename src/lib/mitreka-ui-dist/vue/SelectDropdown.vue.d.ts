type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color = "default" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
type Variant = "solid" | "outline";
export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: string | number | null;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    color?: Color;
    variant?: Variant;
}>, {
    placeholder: string;
    disabled: boolean;
    size: string;
    color: string;
    variant: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | null) => void;
    change: (value: string | number | null) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue: string | number | null;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    color?: Color;
    variant?: Variant;
}>, {
    placeholder: string;
    disabled: boolean;
    size: string;
    color: string;
    variant: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number | null) => any) | undefined;
    onChange?: ((value: string | number | null) => any) | undefined;
}>, {
    variant: Variant;
    size: Size;
    disabled: boolean;
    placeholder: string;
    color: Color;
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
