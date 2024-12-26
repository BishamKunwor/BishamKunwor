import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useToggle from "./use-toggle";

describe("useToggle", () => {
  it("should useToggle be ok", () => {
    const { result } = renderHook(() => useToggle());

    const { isOpen, open, close, toggle } = result.current;

    expect(typeof isOpen).toBe("boolean");
    expect(typeof open).toBe("function");
    expect(typeof close).toBe("function");
    expect(typeof toggle).toBe("function");
  });

  it("should default value be ok", () => {
    const { result } = renderHook(() => useToggle());

    const { isOpen } = result.current;

    expect(isOpen).toBe(false);

    const { result: resultOne } = renderHook(() => useToggle(true));

    const { isOpen: resultOneIsOpen } = resultOne.current;

    expect(resultOneIsOpen).toBe(true);
  });

  it("should function work", () => {
    const { result } = renderHook(() => useToggle());

    const { isOpen, open, close, toggle } = result.current;

    expect(isOpen).toBe(false);

    act(() => {
      open();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle work", () => {
    const { result } = renderHook(() => useToggle());

    const { isOpen, toggle } = result.current;

    expect(isOpen).toBe(false);

    act(() => {
      toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      toggle();
      toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });
});
