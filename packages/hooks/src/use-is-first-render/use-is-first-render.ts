import { useRef } from "react";

export default function useIsFirstRender() {
  const firstRenderRef = useRef(true);

  if (firstRenderRef.current) {
    firstRenderRef.current = false;
    return true;
  }

  return false;
}
