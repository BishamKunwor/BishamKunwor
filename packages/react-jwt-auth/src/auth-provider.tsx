import { useCallback, useLayoutEffect, useState } from "react";
import { AuthContextProvider } from "./auth-context";
import {
  devlog,
  isEmpty,
  isString,
  isTokenExpired,
  isTokenValid,
} from "./helpers";
import useRequestHandler from "./use-request-handler";
import useDedupeNewTokenRequest from "./use-dedupe-new-token-request";
import type { AuthProviderProps } from "./types";

export default function AuthProvider({
  children,
  axiosInstance: axiosPrivate,
  defaultValue,
  getAccessToken,
  debug = false,
  onSignOut,
}: AuthProviderProps) {
  useLayoutEffect(() => {
    // @ts-expect-error
    window.react_jwt_auth_debug = debug;
  }, [debug]);

  const [accessToken, setAccessToken] = useState(() => {
    if (
      isString(defaultValue?.accessToken) &&
      isTokenValid(defaultValue.accessToken)
    ) {
      return defaultValue.accessToken;
    }
  });

  const { getNewTokens } = useDedupeNewTokenRequest({
    setAccessToken,
    getAccessToken,
  });

  useRequestHandler({ accessToken, getNewTokens, axiosPrivate });

  const _getAccessToken = useCallback(async () => {
    if (isEmpty(accessToken) || isTokenExpired(accessToken)) {
      const responseToken = await getNewTokens();
      return responseToken.accessToken;
    }

    devlog(`AUTH-LOG: Access Token Valid 
      Skipped Fetching New Token
      Returning Existing Access Token`);
    return Promise.resolve(accessToken);
  }, [accessToken, getNewTokens]);

  return (
    <AuthContextProvider
      // NOTE: The values are not memoized as the provided is intended to be called on top level
      value={{
        isAuthenticated: isString(accessToken),
        signOut: () => {
          setAccessToken(undefined);
          onSignOut();
        },
        signIn: (accessToken: string) => {
          if (isTokenValid(accessToken)) {
            setAccessToken(accessToken);
            return;
          }

          throw new Error(
            "AUTH-ERROR: (Invalid Token) Received Invalid JWT Token while Sign-In"
          );
        },
        getAccessToken: _getAccessToken,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}
