export type CreateAuthorizationURLProps = {
  redirectURI: string;
  authorizationEndpoint: string;
  state: string;
  codeVerifier?: string | undefined;
  scopes?: string[] | undefined;
  claims?: string[] | undefined;
  duration?: string | undefined;
  prompt?: string | undefined;
  accessType?: string | undefined;
  responseType?: string | undefined;
  display?: string | undefined;
  loginHint?: string | undefined;
  hd?: string | undefined;
  responseMode?: string | undefined;
  additionalParams?: Record<string, string> | undefined;
  scopeJoiner?: string | undefined;
} & ({ clientId: string } | { clientKey: string });

export type UseAuthProps<T extends string> = {
  onSuccess: (platform: T, data: Record<string, string>) => void;
  onError: (
    platform: T,
    error: {
      error_description?: string;
      error?: string;
      state?: string;
      error_reason?: string;
    },
  ) => void;
  configs: (CreateAuthorizationURLProps & { platform: T })[];
};
