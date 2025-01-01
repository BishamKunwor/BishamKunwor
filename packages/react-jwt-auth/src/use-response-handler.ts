import { useLayoutEffect } from "react";
import type { AxiosError, AxiosInstance } from "axios";
import { devlog } from "./helpers";
import type useDedupeNewTokenRequest from "./use-dedupe-new-token-request";

export default function useResponseHandler({
  axiosPrivate,
  getNewTokens,
}: {
  axiosPrivate: AxiosInstance;
  getNewTokens: ReturnType<typeof useDedupeNewTokenRequest>["getNewTokens"];
}) {
  useLayoutEffect(() => {
    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        try {
          if (error.status !== 401) {
            return await Promise.reject(error);
          }

          devlog(`AUTH-LOG: Access Token Expired For ${error.config?.url}`);

          const tokenResponse = await getNewTokens();

          const config = error.config!;
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
  }, [getNewTokens]);
}
