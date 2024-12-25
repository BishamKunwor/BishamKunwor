import { useCallback, useEffect, useRef } from "react";

export default function useDebouncedCallback<
  Callback extends (...args: any[]) => any
>(callback: Callback, delay: number = 0) {
  const debounceTimeoutRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  // NOTE: This effects syncs un-memoized callback into ref without
  // causing re-initialing debounce callback (RARE CASE Consideration)
  if (callbackRef.current !== callback) {
    callbackRef.current = callback;
  }

  useEffect(() => {
    return () => window.clearTimeout(debounceTimeoutRef.current);
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<Callback>) => {
      window.clearTimeout(debounceTimeoutRef.current);

      debounceTimeoutRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  return debouncedCallback;
}
