import type { SocialPlatformConfig, SocialSuccessResponse } from "../types";
import { loadScript, OauthError } from "../utils";

const GOOGLE_SDK_URL = "https://accounts.google.com/gsi/client";

export async function googleOauth(config: SocialPlatformConfig<"google">) {
  await loadScript(GOOGLE_SDK_URL);

  if (!window.google) {
    return Promise.reject(new Error("Error loading google sdk"));
  }

  const initTokenClient = window?.google?.accounts?.oauth2.initTokenClient;
  const initCodeClient = window?.google?.accounts?.oauth2.initCodeClient;

  type test = SocialSuccessResponse<"google">;

  return new Promise<SocialSuccessResponse<"google">>((resolve, reject) => {
    if (config.flow === "auth-code") {
      initCodeClient({
        ...config,
        callback: (res) => {
          if (res.error) {
            reject(
              new OauthError<"google">("Error signing in with google", res)
            );
          }
          resolve(res);
        },
        error_callback: (err) => {
          reject(new OauthError<"google">("Error signing in with google", err));
        },
      }).requestCode();
    } else {
      initTokenClient({
        ...config,
        callback: (res) => {
          if (res.error) {
            reject(
              new OauthError<"google">("Error signing in with google", res)
            );
          }
          resolve(res);
        },
        error_callback: (err) => {
          reject(new OauthError<"google">("Error signing in with google", err));
        },
      }).requestAccessToken();
    }
  });
}
