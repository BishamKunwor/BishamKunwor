import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import useIsFirstRender from "./use-is-first-render";

describe("useIsFirstRender", () => {
  it("should interface be ok", () => {
    const { result } = renderHook(() => useIsFirstRender());

    expect(result.current).toBe(true);
  });

  it("should the value be falsy on consequent re-renders", () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());

    expect(result.current).toBe(true);

    rerender();

    expect(result.current).toBe(false);

    rerender();
    rerender();

    expect(result.current).toBe(false);
  });
});
