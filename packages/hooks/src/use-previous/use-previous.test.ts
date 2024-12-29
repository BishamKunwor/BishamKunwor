import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import usePrevious from "./use-previous";

describe("usePrevious Hook", () => {
  it("should return undefined on the initial render", () => {
    const { result } = renderHook(() => usePrevious(0));

    // Initial render should return undefined for previous value
    expect(result.current).toBeUndefined();
  });

  it("should return the previous value after an update", () => {
    let currentValue = 0;

    const { result, rerender } = renderHook(() => usePrevious(currentValue));

    // Update currentValue
    act(() => {
      currentValue = 1;
      rerender();
    });

    // The previous value should now be the initial value
    expect(result.current).toBe(0);

    // Update again
    act(() => {
      currentValue = 2;
      rerender();
    });

    // The previous value should now reflect the last value
    expect(result.current).toBe(1);
  });

  it("should handle non-primitive values correctly", () => {
    let currentValue = { key: "value1" };

    const { result, rerender } = renderHook(() => usePrevious(currentValue));

    // Update currentValue
    act(() => {
      currentValue = { key: "value2" };
      rerender();
    });

    // The previous value should now be the initial object
    expect(result.current).toEqual({ key: "value1" });

    // Update again
    act(() => {
      currentValue = { key: "value3" };
      rerender();
    });

    // The previous value should now reflect the last object
    expect(result.current).toEqual({ key: "value2" });
  });
});
