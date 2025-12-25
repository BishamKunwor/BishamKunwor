import { socialMediaConfig } from "./social-media-config";
import type {
  GenerateOauthUrlProps,
  OauthPlatformsConfig,
  PlatformKeys,
} from "./types";
import Cookies from "js-cookie";
import { getHostname } from "./utils";
import { oauthResponseSubscription } from "./oauth-res-subscription";
import { generateOauthUrl } from "./generate-oauth-url";

export function configOauthPlatforms<TConfig extends OauthPlatformsConfig>(
  config: TConfig,
  globalConfig?: {
    redirectURI?: string;
  }
) {
  let popupWindowPollInterval: ReturnType<typeof setInterval>;

  const getPlatformOauthUrl = (platform: keyof TConfig) => {
    const defaultSocialPlatformConfig =
      socialMediaConfig[platform as PlatformKeys];

    if (!defaultSocialPlatformConfig) {
      throw new Error(`Config for platform ${String(platform)} was not found`);
    }

    const socialPlatformConfig: GenerateOauthUrlProps = {
      state: Math.random().toString(36).substring(2, 15),
      redirectURI: globalConfig?.redirectURI || window.location.origin,
      ...defaultSocialPlatformConfig,
      ...config[platform],
    };

    return generateOauthUrl(socialPlatformConfig);
  };

  const handleLinkSocial = <SelectedPlatform extends keyof TConfig>(
    platform: SelectedPlatform
  ) => {
    const oauthUrl = getPlatformOauthUrl(platform);

    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popupWindow = window.open(
      oauthUrl.href,
      String(platform),
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popupWindow) {
      throw new Error(
        "Popup window was blocked. Please allow popups for this site."
      );
    }

    Cookies.set("oauthPlatform", String(platform), {
      domain: getHostname(),
    });

    return new Promise((resolve, reject) => {
      if (popupWindowPollInterval) {
        clearInterval(popupWindowPollInterval);
      }

      popupWindowPollInterval = setInterval(() => {
        if (popupWindow.closed) {
          clearInterval(popupWindowPollInterval);

          const oauthResponse = Cookies.get(`${String(platform)}Response`);

          try {
            if (!oauthResponse) {
              return reject({
                error_description: "Failed to link platform",
              });
            }

            const responseDataObj = JSON.parse(oauthResponse);

            if (responseDataObj.error) {
              return reject(responseDataObj);
            }

            return resolve(responseDataObj);
          } catch (error) {
            return reject({
              error_description: "Failed to link platform",
            });
          } finally {
            Cookies.remove(`${String(platform)}Response`, {
              domain: getHostname(),
            });
          }
        }
      }, 250);
    });
  };

  return [handleLinkSocial, oauthResponseSubscription] as const;
}
