import { useState } from "react";
import { AuthContextProvider } from "./auth-context";
import { isString, isTokenValid } from "./helpers";
import useRequestHandler from "./use-request-handler";
import useDedupeNewTokenRequest from "./use-dedupe-new-token-request";
import type { AuthProviderProps } from "./types";
import useDebug from "./use-debug";
import useGetAccessToken from "./use-get-access-token";

export default function AuthProvider({
  children,
  axiosInstance: axiosPrivate,
  defaultValue,
  getAccessToken,
  debug = false,
  onSignOut,
}: AuthProviderProps) {
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

  useDebug(debug);

  useRequestHandler({ accessToken, getNewTokens, axiosPrivate });

  const _getAccessToken = useGetAccessToken(accessToken, getNewTokens);

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
          if (!isTokenValid(accessToken)) {
            throw new Error(
              "AUTH-ERROR: (Invalid Token) Received Invalid JWT Token while Sign-In"
            );
          }

          setAccessToken(accessToken);
        },
        getAccessToken: _getAccessToken,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}
