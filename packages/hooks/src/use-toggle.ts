import { useCallback, useEffect, useState } from "react";

export default function useToggle(isOpen: boolean = false) {
  const [localIsOpen, setIsOpen] = useState(isOpen);

  // Sync Local State to parent state `isOpen`
  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    open,
    close,
    toggle,
    isOpen: localIsOpen,
  };
}
