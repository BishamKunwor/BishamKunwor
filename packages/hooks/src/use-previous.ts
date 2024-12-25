import { useRef } from "react";

export default function usePrevious<T>(preserveValue: T) {
  const ref = useRef<{
    previousValue: T | undefined;
    currentValue: T;
  }>({
    previousValue: undefined,
    currentValue: preserveValue,
  });

  if (ref.current.currentValue !== preserveValue) {
    ref.current.previousValue = ref.current.currentValue;
    ref.current.currentValue = preserveValue;
  }

  return ref.current.previousValue;
}
