A lightweight JavaScript/TypeScript utility for subscribing to changes in browser storage mechanisms: **localStorage**, **sessionStorage**, and **cookieStorage** using the `cookieStore` API. Useful for real-time sync of storage data across browser tabs or app components.

---

## Features

- 📦 Subscribe to **localStorage**, **sessionStorage**, or **cookieStorage**
- 🔄 Automatically update subscribers on `localStorage`, `sessionStorage` and `cookieStore` mutations
- 🔒 Type-safe with TypeScript support
- 🌐 Multi-tab change detection for `localStorage` and `sessionStorage`

---

## Installation

```bash
npm install @bisham/dom-storage-sync
# or
yarn add @bisham/dom-storage-sync
```

---

## Usage

### 1. Import and Use

```ts
import { getStorageSubscription } from "@bisham/dom-storage-sync";

const localStorageSub = getStorageSubscription("localStorage");

const unsubscribe = localStorageSub.subscribe(() => {
  console.log("Local Storage changed:", localStorageSub.getSnapshot());
});

// Later, if needed
unsubscribe();
```

```ts
import { getStorageSubscription } from "@bisham/dom-storage-sync";

const sessionStorageSub = getStorageSubscription("sessionStorage");

const unsubscribe = sessionStorageSub.subscribe(() => {
  console.log("Session Storage changed:", sessionStorageSub.getSnapshot());
});

// Later, if needed
unsubscribe();
```

### 2. Available Storage Types

- `'localStorage'`
- `'sessionStorage'`
- `'cookieStorage'`

### 3. Example with Cookies

```ts
const cookieStorageSub = getStorageSubscription("cookieStorage");

const unsubscribe = cookieStorageSub.subscribe(() => {
  console.log("Cookies updated:", cookieStorageSub.getSnapshot());
});
```

---

## API

### `getStorageSubscription(storageType)`

Returns an object that allows you to **subscribe** to storage changes and **get current snapshot**.

#### Parameters

- `storageType`: `"localStorage" | "sessionStorage" | "cookieStorage"`

#### Returns

```ts
{
  getSnapshot: () => Record<string, string | null> | Map<string, CookieInit>,
  subscribe: (callback: () => void) => () => void
}
```

- `getSnapshot()` returns current key-value pairs of the selected storage.
- `subscribe(callback)` triggers the callback when the storage updates. Returns an `unsubscribe` function.

---

## ⚠️ Notes

- This utility is intended for **client-side** use only.
  > 💡 Make sure your app runs in a **secure context (HTTPS)** for cookieStore to work.

---

## 📄 License

MIT © [Bisham Kunwor](https://bishamkunwor.com.np)

---

## 🧑‍💻 Author

- **Name**: Bisham Kunwor
- **Email**: [novelian.nova@gmail.com](mailto:novelian.nova@gmail.com)
- **GitHub**: [@BishamKunwor](https://github.com/BishamKunwor)
- **Website**: [bishamkunwor.com.np](https://bishamkunwor.com.np)

---
