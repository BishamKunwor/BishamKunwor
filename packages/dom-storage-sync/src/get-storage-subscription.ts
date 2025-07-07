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
  if (typeof window === "undefined") {
    throw new Error(
      `${getStorageSubscription.name} is a client component and must be called inside a browser environment`
    );
  }

  if (storageType === "cookieStorage") {
    return getCookieSubscription();
  }

  return getLocalAndSessionStorageSubscription(storageType);
}
