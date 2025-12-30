import Cookies from "js-cookie";
import { generateOauthUrl } from "./generate-oauth-url";
import { socialMediaConfig } from "./social-platform-configs";
import type { ConfigOauthPlatformsProps, GenerateOauthUrlProps } from "./types";
import { getHostname, OauthError } from "./utils";

export function initiateOauthViaUrl<TConfig extends ConfigOauthPlatformsProps>(
  config: TConfig,
  globalConfig?: {
    redirectURI?: string;
  }
) {
  let popupWindowPollInterval: ReturnType<typeof setInterval>;

  const getSocialPlatformConfig = (platform: keyof TConfig) => {
    const defaultSocialPlatformConfig = socialMediaConfig[platform];

    if (!defaultSocialPlatformConfig) {
      throw new Error(`Config for platform ${String(platform)} was not found`);
    }

    const socialPlatformConfig: GenerateOauthUrlProps = {
      state: Math.random().toString(36).substring(2, 15),
      redirectURI: globalConfig?.redirectURI || window.location.origin,
      ...defaultSocialPlatformConfig,
      ...config[platform],
    };

    return socialPlatformConfig;
  };

  const getPlatformOauthUrl = (platform: keyof TConfig) => {
    const socialPlatformConfig = getSocialPlatformConfig(platform);
    return generateOauthUrl(socialPlatformConfig);
  };

  const handleLinkSocial = async <SelectedPlatform extends keyof TConfig>(
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
        if (!popupWindow.closed) {
          return;
        }

        clearInterval(popupWindowPollInterval);

        const oauthResponse = Cookies.get(`${String(platform)}Response`);

        try {
          if (!oauthResponse) {
            return reject(new Error("Failed to link platform"));
          }

          const responseDataObj = JSON.parse(oauthResponse);

          if (responseDataObj.error) {
            return reject(
              new OauthError(
                `Error while linking platform: ${String(platform)}`,
                responseDataObj
              )
            );
          }

          return resolve(responseDataObj);
        } catch (error) {
          return reject(error);
        } finally {
          Cookies.remove(`${String(platform)}Response`, {
            domain: getHostname(),
          });
        }
      }, 250);
    });
  };

  return handleLinkSocial;
}
