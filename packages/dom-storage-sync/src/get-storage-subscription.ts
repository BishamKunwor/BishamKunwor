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
  if (
    !["localStorage", "sessionStorage", "cookieStorage"].includes(storageType)
  ) {
    throw new Error(`${storageType} is not a valid storage option`);
  }

  if (storageType === "cookieStorage") {
    return getCookieSubscription();
  }

  return getLocalAndSessionStorageSubscription(storageType);
}
