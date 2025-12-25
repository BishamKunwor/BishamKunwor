import type { socialMediaConfig } from "./social-media-config";

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

export type PlatformKeys = keyof typeof socialMediaConfig;
type InitializeOauthPlatformGenericConfig = Partial<
  Omit<GenerateOauthUrlProps, "authorizationEndpoint">
>;

export type OauthPlatformsConfig = {
  [Platform in PlatformKeys]?: InitializeOauthPlatformGenericConfig &
    (Platform extends "tiktok" ? { clientKey: string } : { clientId: string });
};
