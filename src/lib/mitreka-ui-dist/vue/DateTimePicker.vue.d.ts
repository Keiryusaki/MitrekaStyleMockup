type Mode = "single" | "range";
type Picker = "date" | "month" | "year" | "year-grid";
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: string | string[];
    mode?: Mode;
    picker?: Picker;
    enableTime?: boolean;
    noCalendar?: boolean;
    dateFormat?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    minDate?: string;
    maxDate?: string;
    time24hr?: boolean;
    inputClass?: string;
}>, {
    mode: string;
    picker: string;
    enableTime: boolean;
    noCalendar: boolean;
    time24hr: boolean;
    inputClass: string;
    placeholder: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | string[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: string | string[];
    mode?: Mode;
    picker?: Picker;
    enableTime?: boolean;
    noCalendar?: boolean;
    dateFormat?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    minDate?: string;
    maxDate?: string;
    time24hr?: boolean;
    inputClass?: string;
}>, {
    mode: string;
    picker: string;
    enableTime: boolean;
    noCalendar: boolean;
    time24hr: boolean;
    inputClass: string;
    placeholder: string;
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | string[]) => any) | undefined;
}>, {
    mode: Mode;
    picker: Picker;
    enableTime: boolean;
    noCalendar: boolean;
    placeholder: string;
    time24hr: boolean;
    inputClass: string;
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
