import { SDK_SCRIPTS } from "../constants";
import type { SocialPlatformConfig, SocialSuccessResponse } from "../types";
import { loadScript, OauthError } from "../utils";

export async function googleAuthCodeOauth(
  config: SocialPlatformConfig<"googleAuthCode">
) {
  await loadScript(SDK_SCRIPTS.GOOGLE);

  if (!window.google) {
    return Promise.reject(new Error("Error loading google sdk"));
  }

  const initCodeClient = window?.google?.accounts?.oauth2.initCodeClient;

  return new Promise<SocialSuccessResponse<"googleAuthCode">>(
    (resolve, reject) => {
      initCodeClient({
        ...config,
        scope: config.scope ?? "",
        callback: (res) => {
          if (res.error) {
            reject(
              new OauthError<"googleAuthCode">(
                "Error signing in with google",
                res
              )
            );
          }
          resolve(res);
        },
        error_callback: (err) => {
          reject(
            new OauthError<"googleAuthCode">(
              "Error signing in with google",
              err
            )
          );
        },
      }).requestCode();
    }
  );
}
