import { SDK_SCRIPTS } from "../constants";
import { SocialSuccessResponse } from "../types";
import { loadScript, OauthError } from "../utils";

export async function appleOauth(config: AppleSignInAPI.ClientConfigI) {
  await loadScript(SDK_SCRIPTS.APPLE);

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
