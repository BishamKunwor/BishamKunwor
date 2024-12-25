import { useState } from "react";

/**
 * @deprecated Will be removed from next major release
 * Use `useTriggerErrorBoundary` instead
 */
export default function useThrowAsyncError() {
  const [, setState] = useState();

  return (err: Error) => {
    setState(() => {
      throw err;
    });
  };
}
