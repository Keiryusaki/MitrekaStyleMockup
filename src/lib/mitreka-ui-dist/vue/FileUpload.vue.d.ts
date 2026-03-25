declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: File[];
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    maxFiles?: number;
    preview?: boolean;
    class?: string;
    dropzoneText?: string;
    browseText?: string;
    helperText?: string;
    maxSizeText?: string;
    emptyText?: string;
}>, {
    modelValue: () => never[];
    multiple: boolean;
    accept: string;
    disabled: boolean;
    maxFiles: undefined;
    preview: boolean;
    class: string;
    dropzoneText: string;
    browseText: string;
    helperText: string;
    maxSizeText: string;
    emptyText: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (files: File[]) => void;
    change: (files: File[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: File[];
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    maxFiles?: number;
    preview?: boolean;
    class?: string;
    dropzoneText?: string;
    browseText?: string;
    helperText?: string;
    maxSizeText?: string;
    emptyText?: string;
}>, {
    modelValue: () => never[];
    multiple: boolean;
    accept: string;
    disabled: boolean;
    maxFiles: undefined;
    preview: boolean;
    class: string;
    dropzoneText: string;
    browseText: string;
    helperText: string;
    maxSizeText: string;
    emptyText: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((files: File[]) => any) | undefined;
    onChange?: ((files: File[]) => any) | undefined;
}>, {
    modelValue: File[];
    multiple: boolean;
    class: string;
    disabled: boolean;
    accept: string;
    maxFiles: number;
    preview: boolean;
    dropzoneText: string;
    browseText: string;
    helperText: string;
    maxSizeText: string;
    emptyText: string;
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
