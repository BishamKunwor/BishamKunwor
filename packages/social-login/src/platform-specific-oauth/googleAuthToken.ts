import type { SocialPlatformConfig, SocialSuccessResponse } from "../types";
import { loadScript, OauthError } from "../utils";

const GOOGLE_SDK_URL = "https://accounts.google.com/gsi/client";

export async function googleAuthTokenOauth(
  config: SocialPlatformConfig<"googleAuthToken">
) {
  await loadScript(GOOGLE_SDK_URL);

  if (!window.google) {
    return Promise.reject(new Error("Error loading google sdk"));
  }

  const initTokenClient = window?.google?.accounts?.oauth2.initTokenClient;

  return new Promise<SocialSuccessResponse<"googleAuthToken">>(
    (resolve, reject) => {
      initTokenClient({
        ...config,
        callback: (res) => {
          if (res.error) {
            reject(
              new OauthError<"googleAuthToken">(
                "Error signing in with google",
                res
              )
            );
          }
          resolve(res);
        },
        error_callback: (err) => {
          reject(
            new OauthError<"googleAuthToken">(
              "Error signing in with google",
              err
            )
          );
        },
      }).requestAccessToken();
    }
  );
}
