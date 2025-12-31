import { SDK_SCRIPTS } from "../constants";
import type { SocialPlatformConfig, SocialSuccessResponse } from "../types";
import { loadScript } from "../utils";

export async function googleOneTapOauth(
  config: SocialPlatformConfig<"googleOneTap">
) {
  await loadScript(SDK_SCRIPTS.GOOGLE);

  if (!window.google) {
    return Promise.reject(new Error("Error loading google sdk"));
  }

  const initIdClient = window?.google?.accounts?.id.initialize;

  return new Promise<SocialSuccessResponse<"googleOneTap">>(
    (resolve, reject) => {
      initIdClient({
        ...config,
        callback: (res) => resolve(res),
        intermediate_iframe_close_callback: () =>
          reject(new Error("Error signing in with google")),
        native_callback: (res) => {
          resolve(res);
        },
      });

      window?.google?.accounts?.id.prompt();
    }
  );
}
