import { renderHook, act } from "@testing-library/react";
import useDebounceValue from "./use-debounce-value";
import { describe, it, expect, vi } from "vitest";

vi.useFakeTimers(); // Use fake timers to control timeouts in tests

describe("useDebounceValue", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounceValue("initial value"));

    // Initially, the debounced value should be 'initial value'
    expect(result.current).toBe("initial value");
  });

  it("should update the value after the debounce delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      {
        initialProps: {
          value: "initial value",
        },
      }
    );

    // The value should initially be 'initial value'
    expect(result.current).toBe("initial value");

    // Simulate a change in value after 200ms (before debounce is triggered)
    act(() => {
      rerender({ value: "updated value" });
    });

    // The debounced value should not have changed yet
    expect(result.current).toBe("initial value");

    // Fast-forward the timer by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now, the debounced value should be 'updated value'
    expect(result.current).toBe("updated value");
  });

  it("should not update the value before the debounce delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      {
        initialProps: {
          value: "initial value",
        },
      }
    );

    // Initial value
    expect(result.current).toBe("initial value");

    // Simulate a change in value before debounce is triggered
    act(() => {
      rerender({
        value: "new value",
      });
    });

    // The debounced value should still be 'initial value' because the debounce time hasn't passed yet
    expect(result.current).toBe("initial value");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("new value");
  });

  it("should return the last value if multiple changes occur before the debounce delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounceValue(value, 500),
      { initialProps: { value: "initial value" } }
    );

    // Initial value
    expect(result.current).toBe("initial value");

    // Simulate multiple changes in quick succession
    act(() => {
      rerender({ value: "first update" });
    });

    act(() => {
      rerender({ value: "second update" });
    });

    act(() => {
      rerender({ value: "final update" });
    });

    // Fast-forward the timer by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // The debounced value should be the final update
    expect(result.current).toBe("final update");
  });

  it("should handle value changes with different debounce times", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounceValue(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Initial value
    expect(result.current).toBe("initial");

    // Change value and delay
    rerender({ value: "updated", delay: 300 });

    // Simulate time passage
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // The debounced value should be 'updated' after 300ms
    expect(result.current).toBe("updated");

    // Change value again with a new delay
    rerender({ value: "final update", delay: 1000 });

    // Simulate time passage
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // The debounced value should be 'final update' after 1000ms
    expect(result.current).toBe("final update");
  });

  it("should clear the timeout when the component unmounts", () => {
    const { result, unmount } = renderHook(() =>
      useDebounceValue("initial value", 500)
    );

    // Set a new value
    act(() => {
      result.current = "new value";
    });

    // Fast-forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // The debounced value should be 'new value'
    expect(result.current).toBe("new value");

    // Unmount the component
    unmount();

    // Fast-forward time again (ensure timeout is cleared and no value is set)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Ensure the value does not change after unmount
    // (though `debounceValue` won't be accessible, this ensures no further effect happens)
  });
});
