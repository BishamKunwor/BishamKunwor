import { Noop } from "./types";

export const getCookieSubscription = () => {
  const CookieDataStore = new Map<string, CookieInit>();
  const Subscribers = new Set<Noop>();

  const notifySubscribers = () =>
    Subscribers.forEach((subscriber) => subscriber());

  const initiateCookieStore = () => {
    cookieStore.getAll().then((cookieDataArr) => {
      // @ts-ignore
      cookieDataArr.forEach((cookieItem: CookieInit) =>
        CookieDataStore.set(
          cookieItem.name ?? "",
          cookieItem as unknown as CookieInit
        )
      );
      notifySubscribers();
    });
  };

  const subscribe = (onStoreChange: Noop) => {
    Subscribers.add(onStoreChange);

    const handler = (changeEvent: CookieChangeEvent) => {
      changeEvent.changed.forEach((changedItem) => {
        CookieDataStore.set(
          changedItem.name ?? "",
          changedItem as unknown as CookieInit
        );
      });

      changeEvent.deleted.forEach((deletedItem) => {
        CookieDataStore.delete(deletedItem.name ?? "");
      });

      onStoreChange();
    };

    window.cookieStore.addEventListener("change", handler);

    return () => {
      Subscribers.delete(onStoreChange);
      window.cookieStore.removeEventListener("change", handler);
    };
  };

  initiateCookieStore();

  return {
    getSnapshot: () => CookieDataStore,
    subscribe,
  };
};
