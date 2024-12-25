import { useCallback, useState } from "react";

/**
 * @deprecated Will be removed from next major release
 * Please use `useResetKey` instead
 */
export default function useReset() {
  const [resetState, setResetState] = useState(0);

  const reset = useCallback(() => {
    setResetState((prev) => prev + 1);
  }, []);

  return {
    key: resetState,
    reset,
  };
}
