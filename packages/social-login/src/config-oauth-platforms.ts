import {
  appleOauth,
  googleOauth,
  googleOneTapOauth,
} from "./platform-specific-oauth";
import type {
  ConfigOauthPlatformsProps,
  SocialPlatforms
} from "./types";
import { generateState } from "./utils";

export function configOauthPlatforms<TConfig extends ConfigOauthPlatformsProps>(
  config: TConfig,
  globalConfig?: {
    redirectURI?: string;
  }
) {
  function connectSocialPlatform<SelectedPlatform extends keyof TConfig>(
    platform: SelectedPlatform
  ) {
    const _platform = platform as SocialPlatforms;

    if (config[_platform] === undefined) {
      throw new Error(`Config for platform ${_platform} is not defined`);
    }

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

    if (_platform === "googleOneTap") {
      const _config = config[_platform];

      if (typeof _config?.client_id !== "string") {
        throw new Error("clientId is required for google one tap");
      }

      return googleOneTapOauth(_config);
    }

    throw new Error(`Platform ${_platform} is not supported`);
  }

  return { connectSocialPlatform };
}
