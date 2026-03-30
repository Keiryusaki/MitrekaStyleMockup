export type TreeListNode = {
    id: string | number;
    name: string;
    children?: TreeListNode[];
    [key: string]: unknown;
};
type FlatRow = {
    node: TreeListNode;
    depth: number;
    numberLabel: string;
    ancestors: Array<string | number>;
};
type CodeMode = "order" | "field" | "none";
declare function __VLS_template(): {
    meta?(_: {
        row: FlatRow;
        node: TreeListNode;
    }): any;
    actions?(_: {
        row: FlatRow;
        node: TreeListNode;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    nodes: TreeListNode[];
    expandedIds: Array<string | number> | Set<string | number>;
    searchQuery?: string;
    emptyText?: string;
    baseIndent?: number;
    indentStep?: number;
    codeMode?: CodeMode;
    codeField?: string;
}>, {
    searchQuery: string;
    emptyText: string;
    baseIndent: number;
    indentStep: number;
    codeMode: string;
    codeField: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    toggle: (id: string | number) => void;
    "row-click": (node: TreeListNode) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    nodes: TreeListNode[];
    expandedIds: Array<string | number> | Set<string | number>;
    searchQuery?: string;
    emptyText?: string;
    baseIndent?: number;
    indentStep?: number;
    codeMode?: CodeMode;
    codeField?: string;
}>, {
    searchQuery: string;
    emptyText: string;
    baseIndent: number;
    indentStep: number;
    codeMode: string;
    codeField: string;
}>>> & Readonly<{
    onToggle?: ((id: string | number) => any) | undefined;
    "onRow-click"?: ((node: TreeListNode) => any) | undefined;
}>, {
    emptyText: string;
    searchQuery: string;
    baseIndent: number;
    indentStep: number;
    codeMode: CodeMode;
    codeField: string;
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
