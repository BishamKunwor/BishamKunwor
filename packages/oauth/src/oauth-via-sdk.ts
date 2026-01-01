import { socialMediaConfig } from "./constants";
import {
  appleOauth,
  googleAuthCodeOauth,
  googleAuthTokenOauth,
  googleOneTapOauth,
} from "./sdk-adapters";
import type { ConfigOauthPlatformsProps, SocialPlatforms } from "./types";
import { generateState } from "./utils";

export function oauthBySdk<TConfig extends Required<ConfigOauthPlatformsProps>>(
  platform: SocialPlatforms,
  config: TConfig,
  globalConfig?: {
    defaultRedirectURI?: string;
  }
) {
  if (platform === "apple") {
    const platformConfig = config[platform];
    return appleOauth({
      ...platformConfig,
      scope:
        platformConfig.scope ??
        socialMediaConfig.apple?.scopes?.join(" ") ??
        "",
      redirectURI: platformConfig?.redirectURI || globalConfig?.defaultRedirectURI,
      state: platformConfig?.state ?? generateState(),
      usePopup: platformConfig.usePopup ?? true,
    });
  }

  if (platform === "googleAuthToken") {
    const platformConfig = config[platform];

    return googleAuthTokenOauth({
      ...platformConfig,
      scope:
        platformConfig.scope ??
        socialMediaConfig.google?.scopes?.join(" ") ??
        "",
      state: platformConfig?.state ?? generateState(),
    });
  }

  if (platform === "googleAuthCode") {
    const platformConfig = config[platform];
    return googleAuthCodeOauth({
      ...platformConfig,
      scope:
        platformConfig.scope ??
        socialMediaConfig.google?.scopes?.join(" ") ??
        "",
      redirect_uri: platformConfig?.redirect_uri ?? globalConfig?.defaultRedirectURI,
      state: platformConfig?.state ?? generateState(),
    });
  }

  if (platform === "googleOneTap") {
    return googleOneTapOauth(config[platform]);
  }
}
