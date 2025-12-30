import type { SocialErrorResponse, SocialPlatforms } from "./types";

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

export class OauthError<Platform extends SocialPlatforms> extends Error {
  errorResponse: SocialErrorResponse<Platform>;

  constructor(message: string, errorObj: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.errorResponse = errorObj as SocialErrorResponse<Platform>;
  }
}

export const isOauthError = <Platform extends SocialPlatforms>(
  error: unknown,
  platform: Platform
): error is OauthError<Platform> => error instanceof OauthError;

export async function loadScript(url: string) {
  const getLoadedScript = () =>
    document.querySelector<HTMLScriptElement>(`script[src="${url}"]`);

  const scriptElement = getLoadedScript();
  if (scriptElement) {
    return Promise.resolve(scriptElement);
  }

  const script = document.createElement("script");
  script.src = url;
  script.defer = true;
  document.body.appendChild(script);

  return new Promise<ReturnType<typeof getLoadedScript>>((resolve, reject) => {
    script.onload = () => {
      resolve(getLoadedScript());
    };
    script.onerror = (evt) => {
      reject(evt);
      getLoadedScript()?.remove();
    };
  });
}
