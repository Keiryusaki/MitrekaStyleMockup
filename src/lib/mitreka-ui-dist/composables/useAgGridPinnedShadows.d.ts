export type PinnedShadowCleanup = () => void;
declare const attachPinnedShadowsToElement: (rootEl: HTMLElement) => PinnedShadowCleanup;
export declare const attachPinnedShadows: (params: any) => PinnedShadowCleanup;
export { attachPinnedShadowsToElement };
