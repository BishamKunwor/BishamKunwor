import type { Noop } from "./types";
import { CookieDataStore, subscribers } from "./modal";

const notifySubscribers = () =>
  subscribers.forEach((subscriber) => subscriber());

const initiateCookieStore = () => {
  cookieStore.getAll().then((cookieDataArr) => {
    cookieDataArr.forEach((cookieItem) =>
      CookieDataStore.set(
        cookieItem.name ?? "",
        cookieItem as unknown as CookieInit
      )
    );
    notifySubscribers();
  });
};

const setCookieValue = (options: CookieInit) =>
  cookieStore.set(options).then(notifySubscribers);

const deleteCookie = (options: CookieStoreDeleteOptions) =>
  cookieStore.delete(options).then(notifySubscribers);

const subscribe = (onStoreChange: Noop) => {
  subscribers.add(onStoreChange);

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
    subscribers.delete(onStoreChange);
    window.cookieStore.removeEventListener("change", handler);
  };
};

export const cookieStoreState = {
  getSnapshot: () => CookieDataStore,
  set: setCookieValue,
  delete: deleteCookie,
  subscribe,
  initiateCookieStore,
} as const;
