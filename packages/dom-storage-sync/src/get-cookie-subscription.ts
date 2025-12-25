import type { Noop } from "./types";

export const getCookieSubscription = () => {
  const CookieDataStore = new Map<string, CookieListItem>();
  const Subscribers = new Set<Noop>();

  const notifySubscribers = () =>
    Subscribers.forEach((subscriber) => subscriber());

  const initiateCookieStore = () => {
    cookieStore.getAll().then((cookieDataArr) => {
      cookieDataArr.forEach((cookieItem) => {
        cookieItem.name && CookieDataStore.set(cookieItem.name, cookieItem);
      });
      notifySubscribers();
    });
  };

  const subscribe = (onStoreChange: Noop) => {
    Subscribers.add(onStoreChange);

    const handler = (changeEvent: CookieChangeEvent) => {
      changeEvent.changed.forEach((changedItem) => {
        changedItem.name && CookieDataStore.set(changedItem.name, changedItem);
      });

      changeEvent.deleted.forEach((deletedItem) => {
        deletedItem.name && CookieDataStore.delete(deletedItem.name);
      });

      onStoreChange();
    };

    window.cookieStore.addEventListener("change", handler);

    return () => {
      Subscribers.delete(onStoreChange);
      window.cookieStore.removeEventListener("change", handler);
    };
  };

  if (typeof window !== "undefined") {
    initiateCookieStore();
    // @ts-ignore - adding cookie-store pollyfill
    import("cookie-store");
  }

  return {
    getSnapshot: () => CookieDataStore,
    subscribe,
  };
};
