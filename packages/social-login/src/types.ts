/// <reference types="apple-signin-api" />
/// <reference types="google.accounts" />

export type GenerateOauthUrlProps = {
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
};

type SocialPlatformsSchema = {
  apple: {
    success: AppleSignInAPI.SignInResponseI;
    error: AppleSignInAPI.SignInErrorI;
    config: AppleSignInAPI.ClientConfigI;
  };

  google: {
    success: {};
    error: {};
    config:
      | ({ flow: "auth-code" } & google.accounts.oauth2.CodeClientConfig)
      | ({ flow: "implicit" } & google.accounts.oauth2.TokenClientConfig);
  };
};

type Platforms = keyof SocialPlatformsSchema;

export type SocialSuccessResponse<Platform extends Platforms> =
  SocialPlatformsSchema[Platform]["success"];

export type SocialErrorResponse<Platform extends Platforms> =
  SocialPlatformsSchema[Platform]["error"];

export type SocialPlatformConfig<Platform extends Platforms> =
  SocialPlatformsSchema[Platform]["config"];

export type ConfigOauthPlatformsProps = {
  [Platform in Platforms]?: SocialPlatformConfig<Platform>;
};
export type SocialPlatforms = Platforms;
