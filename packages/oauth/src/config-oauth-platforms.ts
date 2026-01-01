import { oauthByUrl } from "./oauth-by-url";
import { oauthBySdk } from "./oauth-via-sdk";
import type {
  ConfigOauthPlatformsProps,
  SocialPlatforms,
  SocialSuccessResponse,
} from "./types";

export function configOauthPlatforms<TConfig extends ConfigOauthPlatformsProps>(
  config: TConfig,
  globalConfig?: {
    defaultRedirectURI?: string;
  }
) {
  function connectSocialPlatform<SelectedPlatform extends keyof TConfig>(
    platform: SelectedPlatform
  ): SelectedPlatform extends SocialPlatforms
    ? Promise<SocialSuccessResponse<SelectedPlatform>>
    : never;
  function connectSocialPlatform(platform: SocialPlatforms) {
    if (config[platform] === undefined) {
      throw new Error(`Config for platform ${platform} is not defined`);
    }

    const sdkPlatforms: SocialPlatforms[] = [
      "apple",
      "googleAuthCode",
      "googleAuthToken",
      "googleOneTap",
    ];

    if (sdkPlatforms.includes(platform)) {
      return oauthBySdk(
        platform,
        config as Required<ConfigOauthPlatformsProps>,
        globalConfig
      );
    }

    return oauthByUrl(
      platform,
      config as Required<ConfigOauthPlatformsProps>,
      globalConfig
    );
  }

  return { connectSocialPlatform };
}
