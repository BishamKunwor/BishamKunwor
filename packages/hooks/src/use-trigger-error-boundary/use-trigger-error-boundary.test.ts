import { renderHook, act } from "@testing-library/react";
import useTriggerErrorBoundary from "./use-trigger-error-boundary";
import { describe, expect, it } from "vitest";

describe("useTriggerErrorBoundary", () => {
  it("should throw the error when the returned function is called", () => {
    const { result } = renderHook(() => useTriggerErrorBoundary());

    const error = new Error("Test error");

    // Wrapping the call in act() because the hook trigger state updates and need to be executed within act
    expect(() => {
      act(() => {
        result.current(error);
      });
    }).toThrow(error);
  });

  it("should throw the exact same error passed to the function", () => {
    const { result, rerender } = renderHook(() => useTriggerErrorBoundary());

    const error1 = new Error("Error 1");
    const error2 = new Error("Error 2");

    // Check that the error passed to the function is correctly thrown
    expect(() => {
      act(() => {
        result.current(error1);
      });
    }).toThrow(error1);

    act(() => {
      // re-setting the error boundary
      rerender();
    });

    expect(() => {
      act(() => {
        result.current(error2);
      });
    }).toThrow(error2);
  });

  it("should throw the error asynchronously", async () => {
    const { result } = renderHook(() => useTriggerErrorBoundary());

    const error = new Error("Async error test");

    // Use an async function with act to handle async error throwing
    await expect(async () => {
      await act(async () => {
        result.current(error);
      });
    }).rejects.toThrow(error);
  });
});
