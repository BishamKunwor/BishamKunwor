import { useLayoutEffect } from "react";
import {
  devlog,
  isEmpty,
  isString,
  isTokenExpired,
  getTokenExpiryTime,
} from "./helpers";
import { UseRequestHandlerProps } from "./types";

export default function useRequestHandler({
  accessToken,
  getNewTokens,
  axiosPrivate,
}: UseRequestHandlerProps) {
  useLayoutEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      async (config) => {
        try {
          if (isEmpty(config.headers.Authorization) && accessToken) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${accessToken}`;
          }

          // Sending request without authorization when accessToken is empty in both state and authorization header
          if (!isString(config.headers.Authorization)) {
            return config;
          }

          const token = config.headers.Authorization.split(" ")[1];

          // Handling tokens with exp property
          if (
            typeof getTokenExpiryTime(token) === "number" &&
            isTokenExpired(token)
          ) {
            devlog(`AUTH-LOG: Access token expired for ${config.url}`);
            const tokenResponse = await getNewTokens();
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
          }

          // Make Request via jwt token with/without exp payload
          // Auth to be handled by response handler in case exp property is missing in jwt payload
          return config;
        } catch (error) {
          devlog("AUTH-ERROR", error);
          return Promise.reject(config);
        }
      },
      (error) => Promise.reject(error)
    );

    return () => axiosPrivate.interceptors.request.eject(reqInterceptor);
  }, [accessToken, getNewTokens]);
}
