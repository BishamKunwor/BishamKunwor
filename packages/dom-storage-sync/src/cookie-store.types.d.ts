interface CookieChangeEventInit extends EventInit {
  changed?: CookieList;
  deleted?: CookieList;
}

interface CookieInit {
  domain?: string | null;
  expires?: DOMHighResTimeStamp | null;
  name: string;
  partitioned?: boolean;
  path?: string;
  sameSite?: CookieSameSite;
  value: string;
}

interface CookieListItem {
  name?: string;
  value?: string;
}

interface CookieStoreDeleteOptions {
  domain?: string | null;
  name: string;
  partitioned?: boolean;
  path?: string;
}

interface CookieStoreGetOptions {
  name?: string;
  url?: string;
}

/**
 * The **`CookieChangeEvent`** interface of the Cookie Store API is the event type of the CookieStore/change_event event fired at a CookieStore when any cookies are created or deleted.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieChangeEvent)
 */
interface CookieChangeEvent extends Event {
  /**
   * The **`changed`** read-only property of the CookieChangeEvent interface returns an array of the cookies that have been changed.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieChangeEvent/changed)
   */
  readonly changed: ReadonlyArray<CookieListItem>;
  /**
   * The **`deleted`** read-only property of the CookieChangeEvent interface returns an array of the cookies that have been deleted by the given `CookieChangeEvent` instance.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieChangeEvent/deleted)
   */
  readonly deleted: ReadonlyArray<CookieListItem>;
}

declare var CookieChangeEvent: {
  prototype: CookieChangeEvent;
  new (type: string, eventInitDict?: CookieChangeEventInit): CookieChangeEvent;
};

interface CookieStoreEventMap {
  change: CookieChangeEvent;
}

/**
 * The **`CookieStore`** interface of the Cookie Store API provides methods for getting and setting cookies asynchronously from either a page or a service worker.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStore)
 */
interface CookieStore extends EventTarget {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStore/change_event) */
  onchange: ((this: CookieStore, ev: CookieChangeEvent) => any) | null;
  /**
   * The **`delete()`** method of the CookieStore interface deletes a cookie that matches the given `name` or `options` object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStore/delete)
   */
  delete(name: string): Promise<void>;
  delete(options: CookieStoreDeleteOptions): Promise<void>;
  /**
   * The **`get()`** method of the CookieStore interface returns a Promise that resolves to a single cookie matching the given `name` or `options` object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStore/get)
   */
  get(name: string): Promise<CookieListItem | null>;
  get(options?: CookieStoreGetOptions): Promise<CookieListItem | null>;
  /**
   * The **`getAll()`** method of the CookieStore interface returns a Promise that resolves as an array of cookies that match the `name` or `options` passed to it.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStore/getAll)
   */
  getAll(name: string): Promise<CookieList>;
  getAll(options?: CookieStoreGetOptions): Promise<CookieList>;
  /**
   * The **`set()`** method of the CookieStore interface sets a cookie with the given `name` and `value` or `options` object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStore/set)
   */
  set(name: string, value: string): Promise<void>;
  set(options: CookieInit): Promise<void>;
  addEventListener<K extends keyof CookieStoreEventMap>(
    type: K,
    listener: (this: CookieStore, ev: CookieStoreEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof CookieStoreEventMap>(
    type: K,
    listener: (this: CookieStore, ev: CookieStoreEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

declare var CookieStore: {
  prototype: CookieStore;
  new (): CookieStore;
};

/**
 * The **`CookieStoreManager`** interface of the Cookie Store API allows service workers to subscribe to cookie change events.
 * Available only in secure contexts.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStoreManager)
 */
interface CookieStoreManager {
  /**
   * The **`getSubscriptions()`** method of the CookieStoreManager interface returns a list of all the cookie change subscriptions for this ServiceWorkerRegistration.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStoreManager/getSubscriptions)
   */
  getSubscriptions(): Promise<CookieStoreGetOptions[]>;
  /**
   * The **`subscribe()`** method of the CookieStoreManager interface subscribes a ServiceWorkerRegistration to cookie change events.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStoreManager/subscribe)
   */
  subscribe(subscriptions: CookieStoreGetOptions[]): Promise<void>;
  /**
   * The **`unsubscribe()`** method of the CookieStoreManager interface stops the ServiceWorkerRegistration from receiving previously subscribed events.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/CookieStoreManager/unsubscribe)
   */
  unsubscribe(subscriptions: CookieStoreGetOptions[]): Promise<void>;
}

declare var CookieStoreManager: {
  prototype: CookieStoreManager;
  new (): CookieStoreManager;
};

declare var cookieStore: CookieStore;
