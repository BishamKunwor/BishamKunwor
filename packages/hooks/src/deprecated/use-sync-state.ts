import { useEffect, useState } from "react";

/**
 * @deprecated Will be removed from next major release
 */
export default function useSyncState<T>(value: T) {
  const [localState, setLocalState] = useState<T>(value);

  // Sync value to Local State
  useEffect(() => {
    setLocalState(value);
  }, [value]);

  return [localState, setLocalState] as const;
}
