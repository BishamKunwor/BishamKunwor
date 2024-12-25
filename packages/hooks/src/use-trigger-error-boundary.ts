import { useState } from "react";

export default function useTriggerErrorBoundary() {
  const [, setState] = useState();

  return (err: Error) => {
    setState(() => {
      throw err;
    });
  };
}
