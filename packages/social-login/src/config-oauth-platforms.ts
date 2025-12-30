import { appleOauth, googleOauth } from "./platform-specific-oauth";
import type { ConfigOauthPlatformsProps, SocialPlatforms } from "./types";
import { generateState } from "./utils";

export function configOauthPlatforms<TConfig extends ConfigOauthPlatformsProps>(
  config: TConfig,
  globalConfig?: {
    redirectURI?: string;
  }
) {
  const connectSocialPlatform = async <SelectedPlatform extends keyof TConfig>(
    platform: SelectedPlatform
  ) => {
    const _platform = platform as SocialPlatforms;

    if (_platform === "apple") {
      const _config = config[_platform] ?? {};
      return appleOauth({
        ..._config,
        redirectURI: _config?.redirectURI || globalConfig?.redirectURI,
        state: _config?.state ?? generateState(),
        usePopup: true,
      });
    }

    if (_platform === "google" && config[_platform]?.flow == "implicit") {
      const _config = config[_platform];

      return googleOauth({
        ..._config,
        flow: _config?.flow ?? "implicit",
        state: _config?.state ?? generateState(),
      });
    }

    if (_platform === "google" && config[_platform]?.flow == "auth-code") {
      const _config = config[_platform];
      return googleOauth({
        ..._config,
        flow: _config?.flow ?? "auth-code",
        redirect_uri: _config?.redirect_uri ?? globalConfig?.redirectURI,
        state: _config?.state ?? generateState(),
      });
    }

    if (_platform === "google" && config[_platform]?.flow == "one-tap") {
      const _config = config[_platform];
      return googleOauth({
        ..._config,
        flow: _config?.flow ?? "one-tap",
      });
    }

    throw new Error(`Platform ${_platform} is not supported`);
  };

  return { connectSocialPlatform };
}
