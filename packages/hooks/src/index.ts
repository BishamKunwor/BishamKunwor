"use client";

export { default as useBrowserResourceIdleCallback } from "./use-browser-resource-idle-callback";
export { default as useDebouncedCallback } from "./use-debounced-callback";
export { default as useDebouncedValue } from "./use-debounced-value";
export { useTriggerErrorBoundary } from "./use-trigger-error-boundary";
export { useResetKey } from "./use-reset-key";
export { useToggle } from "./use-toggle";
export { usePrevious } from "./use-previous";
export { useIsFirstRender } from "./use-is-first-render";
export { useOnlineStatus } from "./use-online-status";

// TODO: Remove these hooks in major release
export { default as useReset } from "./deprecated/use-reset";
export { default as useThrowAsyncError } from "./deprecated/use-throw-async-error";
export { default as useSyncState } from "./deprecated/use-sync-state";
export { default as useDisclosure } from "./deprecated/use-disclosure";
export { default as useMounted, useMountedRef } from "./deprecated/use-mounted";
