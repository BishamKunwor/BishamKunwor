import type { SocialSuccessResponse } from "../socialresponse";
import { loadScript, OauthError } from "../utils";

const APPLE_SDK_URL =
  "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";

export async function appleOauth(config: AppleIDAuthConfig) {
  await loadScript(APPLE_SDK_URL);

  if (!window.AppleID) {
    return Promise.reject(new Error("Error loading apple sdk"));
  }

  window.AppleID.auth.init(config);

  return new Promise<SocialSuccessResponse<"apple">>((resolve, reject) => {
    if (!window.AppleID) {
      return reject(new Error("Error loading apple sdk"));
    }

    window.AppleID.auth
      .signIn()
      .then((res) => resolve(res.authorization))
      .catch((err) => {
        reject(new OauthError("Error signing in with apple", err));
      });
  });
}
