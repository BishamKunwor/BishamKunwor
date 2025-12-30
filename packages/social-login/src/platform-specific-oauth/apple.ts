import { SocialSuccessResponse } from "../types";
import { loadScript, OauthError } from "../utils";

const APPLE_SDK_URL =
  "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";

export async function appleOauth(config: AppleSignInAPI.ClientConfigI) {
  await loadScript(APPLE_SDK_URL);

  if (!window.AppleID) {
    return Promise.reject(new Error("Error loading apple sdk"));
  }

  window.AppleID.auth.init(config);

  return new Promise<SocialSuccessResponse<"apple">>((resolve, reject) => {
    window.AppleID.auth
      .signIn()
      .then(resolve)
      .catch((err) => {
        reject(new OauthError<"apple">("Error signing in with apple", err));
      });
  });
}
