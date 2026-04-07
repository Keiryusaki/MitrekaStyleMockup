type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color = "default" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
type Mask = "none" | "digits" | "phone-id" | "nik" | "npwp" | "currency-idr";
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: string | number;
    type?: string;
    placeholder?: string;
    size?: Size;
    color?: Color;
    disabled?: boolean;
    readonly?: boolean;
    mask?: Mask;
    maxDigits?: number;
    clearable?: boolean;
    passwordToggle?: boolean;
    prefixIcon?: string;
    suffixIcon?: string;
    addonLeft?: string;
    addonRight?: string;
}>, {
    modelValue: string;
    type: string;
    placeholder: string;
    size: string;
    color: string;
    disabled: boolean;
    readonly: boolean;
    mask: string;
    maxDigits: undefined;
    clearable: boolean;
    passwordToggle: boolean;
    prefixIcon: string;
    suffixIcon: string;
    addonLeft: string;
    addonRight: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
    clear: () => void;
    enter: () => void;
    focus: (event: FocusEvent) => void;
    blur: (event: FocusEvent) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: string | number;
    type?: string;
    placeholder?: string;
    size?: Size;
    color?: Color;
    disabled?: boolean;
    readonly?: boolean;
    mask?: Mask;
    maxDigits?: number;
    clearable?: boolean;
    passwordToggle?: boolean;
    prefixIcon?: string;
    suffixIcon?: string;
    addonLeft?: string;
    addonRight?: string;
}>, {
    modelValue: string;
    type: string;
    placeholder: string;
    size: string;
    color: string;
    disabled: boolean;
    readonly: boolean;
    mask: string;
    maxDigits: undefined;
    clearable: boolean;
    passwordToggle: boolean;
    prefixIcon: string;
    suffixIcon: string;
    addonLeft: string;
    addonRight: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onClear?: (() => any) | undefined;
    onBlur?: ((event: FocusEvent) => any) | undefined;
    onFocus?: ((event: FocusEvent) => any) | undefined;
    onEnter?: (() => any) | undefined;
}>, {
    modelValue: string | number;
    size: Size;
    type: string;
    mask: Mask;
    disabled: boolean;
    placeholder: string;
    color: Color;
    readonly: boolean;
    clearable: boolean;
    maxDigits: number;
    passwordToggle: boolean;
    prefixIcon: string;
    suffixIcon: string;
    addonLeft: string;
    addonRight: string;
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
