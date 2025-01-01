import { useCallback } from "react";
import { devlog, isEmpty, isTokenExpired, getTokenExpiryTime } from "./helpers";
import useDedupeNewTokenRequest from "./use-dedupe-new-token-request";

export default function useGetAccessToken(
  accessToken: string | undefined,
  getNewTokens: ReturnType<typeof useDedupeNewTokenRequest>["getNewTokens"]
) {
  const getAccessToken = useCallback(
    async (options?: { forceTokenFetch: boolean }) => {
      // The force token fetch is an optional flag which is used when jwt
      // payload does not have expiry time as currently we're returning chached
      // access token when exp property is misssing in jwt payload
      if (isEmpty(accessToken) || options?.forceTokenFetch) {
        const responseToken = await getNewTokens();
        return responseToken.accessToken;
      }

      // If exp property is missing in jwt payload then we skip re-fetch
      // and return existing access-token
      if (typeof getTokenExpiryTime(accessToken) === "undefined") {
        devlog(`AUTH-LOG: Access Token Valid 
            Skipped Fetching New Token
            Returning Existing Access Token`);
        return Promise.resolve(accessToken);
      }

      if (isTokenExpired(accessToken)) {
        const responseToken = await getNewTokens();
        return responseToken.accessToken;
      }

      return Promise.resolve(accessToken);
    },
    [accessToken, getNewTokens]
  );

  return getAccessToken;
}
