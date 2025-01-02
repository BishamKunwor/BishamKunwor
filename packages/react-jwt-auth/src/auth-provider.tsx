import { useState } from "react";
import { AuthContextProvider } from "./auth-context";
import { isString, isTokenValid } from "./helpers";
import useRequestHandler from "./use-request-handler";
import useDedupeNewTokenRequest from "./use-dedupe-new-token-request";
import type { AuthProviderProps } from "./types";
import useDebug from "./use-debug";
import useGetAccessToken from "./use-get-access-token";
import useResponseHandler from "./use-response-handler";

export default function AuthProvider({
  children,
  axiosInstance: axiosPrivate,
  defaultValue,
  getAccessToken,
  debug = false,
  onSignOut,
  onSignIn,
}: AuthProviderProps) {
  // Sets Global Property for enabling and disabling debugging
  useDebug(debug);

  const [accessToken, setAccessToken] = useState(() => {
    if (
      isString(defaultValue?.accessToken) &&
      isTokenValid(defaultValue.accessToken)
    ) {
      return defaultValue.accessToken;
    }
  });

  // Dedupe `getAccessToken` api callback when multiple token expired api request triggers fetch
  const { getNewTokens } = useDedupeNewTokenRequest({
    setAccessToken,
    getAccessToken,
  });

  // Handles Authentication when jwt payload contain exp property
  useRequestHandler({ accessToken, getNewTokens, axiosPrivate });

  // Handles Authentication when jwt payload does not contain exp property
  useResponseHandler({ axiosPrivate, getNewTokens });

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
          onSignIn?.(accessToken);
        },
        getAccessToken: _getAccessToken,
      }}
    >
      {children}
    </AuthContextProvider>
  );
}
