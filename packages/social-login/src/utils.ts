import type { SocialErrorResponse } from "./socialresponse";
import type { PlatformKeys } from "./types";

export function generateCodeChallenge(codeVerifier: string) {
  const utf8 = new TextEncoder().encode(codeVerifier);
  return btoa(String.fromCharCode(...utf8));
}

export function getHostname() {
  const hostname = window.location.hostname;
  const splittedHostName = hostname.split(".");
  return splittedHostName.includes("www")
    ? splittedHostName.filter((_, index) => index !== 0).join(".")
    : hostname;
}

export class OauthError<Platform extends PlatformKeys> extends Error {
  errorResponse: SocialErrorResponse<Platform>;

  constructor(message: string, errorObj: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.errorResponse = errorObj as SocialErrorResponse<Platform>;
  }
}

export const isOauthError = <Platform extends PlatformKeys>(
  error: unknown,
  platform: Platform
): error is OauthError<Platform> => error instanceof OauthError;
