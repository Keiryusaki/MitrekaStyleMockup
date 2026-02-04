export type SidebarItem = {
    id: string;
    label: string;
    href?: string;
    icon?: string;
    exact?: boolean;
    children?: SidebarItem[];
};
interface Props {
    items: SidebarItem[];
    collapsed?: boolean;
    activeHref?: string;
    showSearch?: boolean;
    placeholder?: string;
    defaultOpenIds?: string[];
}
declare function __VLS_template(): {
    header?(_: {}): any;
    icon?(_: {
        item: SidebarItem;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    collapsed: boolean;
    showSearch: boolean;
    placeholder: string;
    defaultOpenIds: () => never[];
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    navigate: (item: SidebarItem) => void;
    toggle: (id: string, open: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    collapsed: boolean;
    showSearch: boolean;
    placeholder: string;
    defaultOpenIds: () => never[];
}>>> & Readonly<{
    onToggle?: ((id: string, open: boolean) => any) | undefined;
    onNavigate?: ((item: SidebarItem) => any) | undefined;
}>, {
    placeholder: string;
    collapsed: boolean;
    showSearch: boolean;
    defaultOpenIds: string[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
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
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
