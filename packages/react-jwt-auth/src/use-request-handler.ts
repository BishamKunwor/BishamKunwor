import { useLayoutEffect } from "react";

import { devlog, isEmpty, isString, isTokenExpired } from "./helpers";
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

          if (
            isString(config.headers.Authorization) &&
            isTokenExpired(config.headers.Authorization.split(" ")[1])
          ) {
            devlog(`AUTH-LOG: Access token expired for ${config.url}`);

            const tokenResponse = await getNewTokens();

            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
          }

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
