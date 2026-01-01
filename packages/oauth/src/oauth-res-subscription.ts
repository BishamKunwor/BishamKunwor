import Cookies from "js-cookie";
import { getHostname } from "./utils";

export function oauthResponseSubscription() {
  const currentPlatform = Cookies.get("oauthPlatform");

  if (typeof currentPlatform !== "string" || currentPlatform.length === 0) {
    return;
  }

  const currentURLContext = new URL(window.location.href);

  const responseData = Object.fromEntries(
    currentURLContext.searchParams.entries()
  );

  if (Object.keys(responseData).length === 0) {
    window.close();
    return;
  }

  Cookies.set(`${currentPlatform}Response`, JSON.stringify(responseData), {
    domain: getHostname(),
  });

  Cookies.remove("oauthPlatform", {
    domain: getHostname(),
  });

  window.close();
}
