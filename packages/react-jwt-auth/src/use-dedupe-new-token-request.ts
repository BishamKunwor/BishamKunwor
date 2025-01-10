import { useCallback, useRef } from "react";
import type { UseDedupeNewTokenRequestProps } from "./types";
import { RefreshDedupeUnion } from "./types";
import { devlog, isEmpty, isTokenValid } from "./helpers";

export default function useDedupeNewTokenRequest({
  getAccessToken,
  setAccessToken,
}: UseDedupeNewTokenRequestProps) {
  const refreshDedupeRef = useRef<RefreshDedupeUnion>({
    isFetchingTokens: false,
    refetchAxiosInstance: undefined,
  });

  const initiateTokenFetch = useCallback(() => {
    const axiosRequest = getAccessToken();

    refreshDedupeRef.current.isFetchingTokens = true;
    refreshDedupeRef.current.refetchAxiosInstance = axiosRequest;

    return axiosRequest;
  }, []);

  const resetDedupeRef = useCallback(() => {
    // Re-setting the original case after refresh-token is successfully fetched
    refreshDedupeRef.current.isFetchingTokens = false;
    refreshDedupeRef.current.refetchAxiosInstance = undefined;
  }, []);

  const getNewTokens = useCallback(async () => {
    try {
      let tokenResponse: Awaited<ReturnType<typeof initiateTokenFetch>>;

      if (refreshDedupeRef.current.isFetchingTokens) {
        devlog("AUTH-LOG: Waiting for de-duped Access Token");
        tokenResponse = await refreshDedupeRef.current.refetchAxiosInstance;
      } else {
        devlog("AUTH-LOG: Fetching New Access Token");
        tokenResponse = await initiateTokenFetch();
      }

      resetDedupeRef();

      if (isEmpty(tokenResponse) || isEmpty(tokenResponse.accessToken)) {
        throw new Error(
          "AUTH-ERROR: Received undefined when invoking getAccessToken function"
        );
      }

      if (!isTokenValid(tokenResponse.accessToken)) {
        throw new Error(
          "AUTH-ERROR: (Invalid Token) Received Invalid JWT Token while fetching for new Token"
        );
      }

      setAccessToken(tokenResponse.accessToken);
      return tokenResponse;
    } catch (error) {
      devlog("AUTH-ERROR", error);
      setAccessToken(undefined);
      return Promise.reject(error);
    }
  }, [initiateTokenFetch, resetDedupeRef, setAccessToken]);

  return {
    getNewTokens,
  };
}
