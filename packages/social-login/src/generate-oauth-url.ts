import type { GenerateOauthUrlProps } from "./types";
import { generateCodeChallenge } from "./utils";

export function generateOauthUrl(props: GenerateOauthUrlProps) {
  const {
    authorizationEndpoint,
    state,
    codeVerifier,
    scopes,
    claims,
    redirectURI,
    duration,
    prompt,
    accessType,
    responseType,
    display,
    loginHint,
    hd,
    responseMode,
    additionalParams,
    scopeJoiner,
  } = props;
  const url = new URL(authorizationEndpoint);
  url.searchParams.set("response_type", responseType || "code");
  const isClientId = "clientId" in props;

  // @ts-expect-error - clientKey is optional
  const primaryClientId = isClientId ? props.clientId : props.clientKey;

  if (isClientId) {
    url.searchParams.set("client_id", primaryClientId);
  } else {
    url.searchParams.set("client_key", primaryClientId);
  }
  url.searchParams.set("state", state);
  if (scopes) {
    url.searchParams.set("scope", scopes.join(scopeJoiner || " "));
  }
  url.searchParams.set("redirect_uri", redirectURI);
  duration && url.searchParams.set("duration", duration);
  display && url.searchParams.set("display", display);
  loginHint && url.searchParams.set("login_hint", loginHint);
  prompt && url.searchParams.set("prompt", prompt);
  hd && url.searchParams.set("hd", hd);
  accessType && url.searchParams.set("access_type", accessType);
  responseMode && url.searchParams.set("response_mode", responseMode);
  if (codeVerifier) {
    const codeChallenge = generateCodeChallenge(codeVerifier);

    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("code_challenge", codeChallenge);
  }
  if (claims) {
    const claimsObj = claims.reduce((acc, claim) => {
      acc[claim] = null;
      return acc;
    }, {} as Record<string, null>);
    url.searchParams.set(
      "claims",
      JSON.stringify({
        id_token: { email: null, email_verified: null, ...claimsObj },
      })
    );
  }
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  return url;
}
