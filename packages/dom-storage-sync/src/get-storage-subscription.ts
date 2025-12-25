import { getCookieSubscription } from "./get-cookie-subscription";
import { getLocalAndSessionStorageSubscription } from "./get-local-and-session-storage-subscription";

export function getStorageSubscription(
  storageType: "cookieStorage"
): ReturnType<typeof getCookieSubscription>;

export function getStorageSubscription(
  storageType: "localStorage" | "sessionStorage"
): ReturnType<typeof getLocalAndSessionStorageSubscription>;

export function getStorageSubscription(
  storageType: "localStorage" | "sessionStorage" | "cookieStorage"
) {
  if (storageType === "cookieStorage") {
    return getCookieSubscription();
  }

  return getLocalAndSessionStorageSubscription(storageType);
}
