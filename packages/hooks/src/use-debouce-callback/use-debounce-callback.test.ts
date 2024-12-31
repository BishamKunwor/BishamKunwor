import { describe, expect, it, vi } from "vitest";

import { renderHook, act } from "@testing-library/react";
import useDebouceCallback from "./use-debounce-callback";

vi.useFakeTimers();

describe("useDebouceCallback", () => {
  it("should execute the callback after the delay time", () => {
    const mock = vi.fn();

    const { result } = renderHook(() => useDebouceCallback(mock, 500));

    expect(mock).toBeCalledTimes(0);

    act(() => {
      result.current();
    });

    expect(mock).toBeCalledTimes(0);

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mock).toBeCalledTimes(1);
  });

  //   it("should invoke the callback only once after the timout has expired", () => {});
  //   it("should reset timeout when first callback executes", () => {});

  //   it("should execute callback immediately when delay is 0ms", () => {});
  //   it("should not execute callback when the component unmounts", () => {});
  //   it("should change timeout when delay argument is changed", () => {});

  //   it("should handle when multiple arguments are passed to callback function");
  //   it("should not invoke the callback when re-render occurs");

  //   it("should handle large timeout delay e.g. 5 seconds");
  //   it(
  //     "should work independently work from different instance of useDebounceCallback hook"
  //   );
});
