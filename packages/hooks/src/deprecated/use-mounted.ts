import { useEffect, useRef, useState } from "react";

/**
 * @deprecated Will be removed from next major release
 */
export default function useMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

/**
 * @deprecated Will be removed from next major release
 */
export function useMountedRef() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  return isMountedRef.current;
}
