"use client";

export { default as useIsFirstRender } from "./use-is-first-render";
export { default as useOnlineStatus } from "./use-online-status";
export { default as usePrevious } from "./use-previous";
export { default as useResetKey } from "./use-reset-key";
export { default as useToggle } from "./use-toggle";
export { default as useTriggerErrorBoundary } from "./use-trigger-error-boundary";

// TODO: Remove these hooks in major release
export { default as useReset } from "./deprecated/use-reset";
export { default as useThrowAsyncError } from "./deprecated/use-throw-async-error";
export { default as useSyncState } from "./deprecated/use-sync-state";
export { default as useDisclosure } from "./deprecated/use-disclosure";
export { default as useMounted, useMountedRef } from "./deprecated/use-mounted";
