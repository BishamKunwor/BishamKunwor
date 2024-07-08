import isBrowser from "./isBrowser";

export default function isOnline() {
  return isBrowser() ? navigator.onLine : null;
}
