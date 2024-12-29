import { renderHook, act } from "@testing-library/react";
import useResetKey from "./use-reset-key";
import { describe, expect, it } from "vitest";

describe("useResetKey", () => {
  it("should initialize with key as 0", () => {
    const { result } = renderHook(() => useResetKey());
    expect(result.current.key).toBe(0);
  });

  it("should update the key when reset is called", () => {
    const { result } = renderHook(() => useResetKey());

    // Initial key should be 0
    expect(result.current.key).toBe(0);

    // Call reset once
    act(() => {
      result.current.reset();
    });
    expect(result.current.key).toBe(1);

    // Call reset again
    act(() => {
      result.current.reset();
    });
    expect(result.current.key).toBe(2);
  });

  it("should increment key each time reset is called", () => {
    const { result } = renderHook(() => useResetKey());

    // Initial key should be 0
    expect(result.current.key).toBe(0);

    // Call reset multiple times
    act(() => {
      result.current.reset();
    });
    expect(result.current.key).toBe(1);

    act(() => {
      result.current.reset();
    });
    expect(result.current.key).toBe(2);

    act(() => {
      result.current.reset();
    });
    expect(result.current.key).toBe(3);
  });

  it("should not mutate the previous state, but increment it", () => {
    const { result } = renderHook(() => useResetKey());

    // Initial state
    const initialKey = result.current.key;

    // Call reset
    act(() => {
      result.current.reset();
    });

    // Key should increment by 1
    expect(result.current.key).toBe(initialKey + 1);
  });
});
