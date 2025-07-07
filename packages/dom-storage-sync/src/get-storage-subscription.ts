type Noop = () => void;

export const getStorageSubscription = (
  storageType: "localStorage" | "sessionStorage"
) => {
  const Subscribers = new Set<Noop>();

  const getStorage = () => {
    if (storageType === "localStorage") {
      return window.localStorage;
    }

    if (storageType === "sessionStorage") {
      return window.sessionStorage;
    }

    throw new Error(`storageType with ${storageType} value is not valid`);
  };

  const getStorageValues = () => {
    const {
      clear,
      getItem,
      key,
      length,
      removeItem,
      setItem,
      ...storageValues
    } = getStorage();

    return storageValues as Record<string, string | null>;
  };

  const notifySubscribers = () =>
    Subscribers.forEach((subscriber) => subscriber());

  const subscribe = (subscriber: Noop) => {
    Subscribers.add(subscriber);

    const handler = (event: StorageEvent) => {
      if (event.storageArea !== getStorage()) {
        return;
      }

      subscriber();
    };

    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("storage", handler);
      Subscribers.delete(subscriber);
    };
  };

  const initStorageCapture = () => {
    if (typeof window === "undefined") {
      throw new Error(
        `${getStorageSubscription.name} is a client component and must be called inside a browser environment`
      );
    }

    const storage = getStorage();

    const { clear, removeItem, setItem } = storage;

    storage.setItem = function (key: string, value: string) {
      setItem.call(this, key, value);
      notifySubscribers();
    };

    storage.removeItem = function (key: string) {
      removeItem.call(this, key);
      notifySubscribers();
    };

    storage.clear = function () {
      clear.call(this);
      notifySubscribers();
    };
  };

  initStorageCapture();

  return {
    getSnapShot: getStorageValues,
    initStorageCapture,
    subscribe,
  };
};
