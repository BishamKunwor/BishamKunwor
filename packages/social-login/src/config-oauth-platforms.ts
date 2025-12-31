import { initiateOauthViaUrl } from "./initiate-oauth-via-url";
import {
  appleOauth,
  googleAuthCodeOauth,
  googleAuthTokenOauth,
  googleOneTapOauth,
} from "./platform-specific-oauth";
import { socialMediaConfig } from "./social-platform-configs";
import type {
  ConfigOauthPlatformsProps,
  SocialPlatforms,
  SocialSuccessResponse,
} from "./types";
import { generateState } from "./utils";

export function configOauthPlatforms<TConfig extends ConfigOauthPlatformsProps>(
  config: TConfig,
  globalConfig?: {
    redirectURI?: string;
  }
) {
  const oauthInit = initiateOauthViaUrl(config, globalConfig);

  function connectSocialPlatform<SelectedPlatform extends keyof TConfig>(
    platform: SelectedPlatform
  ): SelectedPlatform extends SocialPlatforms
    ? Promise<SocialSuccessResponse<SelectedPlatform>>
    : never;
  function connectSocialPlatform(platform: SocialPlatforms) {
    const _platform = platform as SocialPlatforms;

    if (config[_platform] === undefined) {
      throw new Error(`Config for platform ${_platform} is not defined`);
    }

    if (_platform === "apple") {
      const _config = config[_platform] ?? {};
      return appleOauth({
        ..._config,
        scope: _config.scope ?? socialMediaConfig.apple.scopes.join(" "),
        redirectURI: _config?.redirectURI || globalConfig?.redirectURI,
        state: _config?.state ?? generateState(),
        usePopup: _config.usePopup ?? true,
      });
    }

    if (_platform === "googleAuthToken") {
      const _config = config[_platform];

      return googleAuthTokenOauth({
        ..._config,
        scope: _config.scope ?? socialMediaConfig.google.scopes.join(" "),
        state: _config?.state ?? generateState(),
      });
    }

    if (_platform === "googleAuthCode") {
      const _config = config[_platform];
      return googleAuthCodeOauth({
        ..._config,
        scope: _config.scope ?? socialMediaConfig.google.scopes.join(" "),
        redirect_uri: _config?.redirect_uri ?? globalConfig?.redirectURI,
        state: _config?.state ?? generateState(),
      });
    }

    if (_platform === "googleOneTap") {
      const _config = config[_platform];

      if (typeof _config?.client_id !== "string") {
        throw new Error("clientId is required for google one tap");
      }

      return googleOneTapOauth(_config);
    }

    oauthInit(_platform);

    throw new Error(`Platform ${_platform} is not supported`);
  }

  return { connectSocialPlatform };
}
