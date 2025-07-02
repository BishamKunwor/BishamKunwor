import { useCallback, useSyncExternalStore } from "react";

import { cookieStoreState } from "./controller";

export const useCookieState = (name: string) => {
  const value = useSyncExternalStore(cookieStoreState.subscribe, () =>
    cookieStoreState.getSnapshot().get(name)
  );

  const setValue = useCallback(
    (options: Omit<CookieInit, "name">) => {
      cookieStoreState.set({ ...options, name });
    },
    [name]
  );

  const deleteCookie = useCallback(
    (options?: Omit<CookieStoreDeleteOptions, "name">) => {
      cookieStoreState.delete({ ...options, name });
    },
    [name]
  );

  return [value, setValue, deleteCookie] as const;
};
