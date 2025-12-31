import Cookies from "js-cookie";
import { generateOauthUrl } from "./generate-oauth-url";
import { socialMediaConfig } from "./constants";
import {
  SocialSuccessResponse,
  type ConfigOauthPlatformsProps,
  type GenerateOauthUrlProps,
  type SocialPlatforms,
} from "./types";
import { getHostname, OauthError } from "./utils";

let popupWindowPollInterval: ReturnType<typeof setInterval>;

export function oauthByUrl<TConfig extends Required<ConfigOauthPlatformsProps>>(
  platform: SocialPlatforms,
  config: TConfig,
  globalConfig?: {
    redirectURI?: string;
  }
) {
  const defaultPlatformConfig = socialMediaConfig[platform as SocialPlatforms];

  const socialPlatformConfig = {
    state: Math.random().toString(36).substring(2, 15),
    redirectURI: globalConfig?.redirectURI || window.location.origin,
    ...defaultPlatformConfig,
    ...config[platform],
  } as GenerateOauthUrlProps;

  const oauthUrl = generateOauthUrl(socialPlatformConfig);

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

  return new Promise<SocialSuccessResponse<SocialPlatforms>>(
    (resolve, reject) => {
      if (popupWindowPollInterval) {
        clearInterval(popupWindowPollInterval);
      }

      const handlePopupWindowClose = () => {
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
      };

      popupWindowPollInterval = setInterval(handlePopupWindowClose, 250);
    }
  );
}
