import type { SocialPlatformConfig } from "../types";
import { loadScript, OauthError } from "../utils";

const GOOGLE_SDK_URL = "https://accounts.google.com/gsi/client";

const isAuthCodeConfig = (
  config: SocialPlatformConfig<"google">
): config is SocialPlatformConfig<"google"> & { flow: "auth-code" } => {
  return config.flow === "auth-code";
};

const isImplicitConfig = (
  config: SocialPlatformConfig<"google">
): config is SocialPlatformConfig<"google"> & { flow: "implicit" } => {
  return config.flow === "implicit";
};

export async function googleOauth<Flow extends "auth-code" | "implicit">(
  config: SocialPlatformConfig<"google"> & { flow: Flow }
) {
  await loadScript(GOOGLE_SDK_URL);

  if (!window.google) {
    return Promise.reject(new Error("Error loading google sdk"));
  }

  const initTokenClient = window?.google?.accounts?.oauth2.initTokenClient;
  const initCodeClient = window?.google?.accounts?.oauth2.initCodeClient;

  type SuccessResponse = Flow extends "auth-code"
    ? google.accounts.oauth2.CodeResponse
    : google.accounts.oauth2.TokenResponse;

  return new Promise<SuccessResponse>((resolve, reject) => {
    if (isAuthCodeConfig(config)) {
      initCodeClient({
        ...config,
        callback: (res) => {
          if (res.error) {
            reject(
              new OauthError<"google">("Error signing in with google", res)
            );
          }
          resolve(res as SuccessResponse);
        },
        error_callback: (err) => {
          reject(new OauthError<"google">("Error signing in with google", err));
        },
      }).requestCode();
    }

    if (isImplicitConfig(config)) {
      initTokenClient({
        ...config,
        callback: (res) => {
          if (res.error) {
            reject(
              new OauthError<"google">("Error signing in with google", res)
            );
          }
          resolve(res as SuccessResponse);
        },
        error_callback: (err) => {
          reject(new OauthError<"google">("Error signing in with google", err));
        },
      }).requestAccessToken();
    }
  });
}
