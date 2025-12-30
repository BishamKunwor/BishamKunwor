import { appleOauth } from "./platform-specific-oauth";
import type { ConfigOauthPlatformsProps, SocialPlatforms } from "./types";

export function configOauthPlatforms<TConfig extends ConfigOauthPlatformsProps>(
  config: TConfig,
  globalConfig?: {
    redirectURI?: string;
  }
) {
  const generateState = () => Math.random().toString(36).substring(2, 15);

  const connectSocialPlatform = async <SelectedPlatform extends keyof TConfig>(
    platform: SelectedPlatform
  ) => {
    const _platform = platform as SocialPlatforms;

    if (_platform === "apple" && config) {
      const _config = config[_platform];
      return appleOauth({
        ..._config,
        redirectURI: _config?.redirectURI || globalConfig?.redirectURI,
        state: _config?.state ?? generateState(),
        usePopup: true,
      });
    }

    throw new Error(`Platform ${_platform} is not supported`);
  };

  return { connectSocialPlatform };
}
