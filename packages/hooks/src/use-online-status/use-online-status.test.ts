import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useOnlineStatus from "./use-online-status";

describe("useOnnlineStatus", () => {
  it("should return 'online' as initial state", () => {
    const { result } = renderHook(() => useOnlineStatus());

    expect(result.current).toBe("online");
  });

  it("should update status to 'offline' when offline event is triggered", () => {
    const { result } = renderHook(() => useOnlineStatus());

    expect(result.current).toBe("online");

    act(() => {
      Object.defineProperty(navigator, "onLine", {
        value: false,
        configurable: true,
      });

      window.dispatchEvent(new Event("offline"));
    });

    expect(result.current).toBe("offline");
  });

  it("should update status to 'online' when online event is triggered", () => {
    const { result } = renderHook(() => useOnlineStatus());

    expect(result.current).toBe("online");

    act(() => {
      Object.defineProperty(navigator, "onLine", {
        value: false,
        configurable: true,
      });

      window.dispatchEvent(new Event("offline"));
    });

    expect(result.current).toBe("offline");

    act(() => {
      Object.defineProperty(navigator, "onLine", {
        value: true,
        configurable: true,
      });

      window.dispatchEvent(new Event("online"));
    });

    expect(result.current).toBe("online");
  });
});
