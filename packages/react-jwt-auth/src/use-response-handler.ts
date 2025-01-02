import { useLayoutEffect } from "react";
import { devlog } from "./helpers";
import type { UseResponseHandlerProps } from "./types";
import axios from "axios";

export default function useResponseHandler({
  axiosPrivate,
  getNewTokens,
}: UseResponseHandlerProps) {
  useLayoutEffect(() => {
    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (!axios.isAxiosError(error) || typeof error.config === "undefined") {
          return Promise.reject(error);
        }

        try {
          if (error.status !== 401) {
            return await Promise.reject(error);
          }

          devlog(`AUTH-LOG: Access Token Expired For ${error.config?.url}`);

          const tokenResponse = await getNewTokens();

          const config = error.config;
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
          return await axiosPrivate(config);
        } catch (err) {
          devlog(`AUTH-ERROR`, error);

          return Promise.reject(error);
        }
      }
    );

    return () => axiosPrivate.interceptors.response.eject(resInterceptor);
  }, [axiosPrivate, getNewTokens]);
}
