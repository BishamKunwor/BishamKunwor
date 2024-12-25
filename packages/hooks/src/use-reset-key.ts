import { useCallback, useState } from "react";

/**
 * Use this Hook as key to ReactElement and call reset to trigger destoryOnClose Feature
 */
export default function useResetKey() {
  const [resetState, setResetState] = useState(0);

  const reset = useCallback(() => {
    setResetState((prev) => prev + 1);
  }, []);

  return {
    key: resetState,
    reset,
  };
}
