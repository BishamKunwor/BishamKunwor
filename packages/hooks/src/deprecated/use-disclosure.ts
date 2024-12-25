import { useCallback, useMemo } from "react";
import useSyncState from "./use-sync-state";

/**
 * @deprecated Will be removed from next major release
 * Use `useToggle` instead
 */
export default function useDisclosure(isOpen: boolean = false) {
  const [localIsOpen, setIsOpen] = useSyncState(isOpen);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  const api = useMemo(
    () =>
      ({
        open,
        close,
        toggle,
        isOpen: localIsOpen,
      } as const),
    [open, close, localIsOpen, toggle]
  );

  return api;
}
