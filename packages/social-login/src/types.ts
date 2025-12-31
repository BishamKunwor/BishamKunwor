/// <reference types="apple-signin-api" />
/// <reference types="google.accounts" />

export type GenerateOauthUrlProps = {
  clientId?: string;
  clientKey?: string;
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

  googleAuthCode: {
    success: google.accounts.oauth2.CodeResponse;
    error:
      | google.accounts.oauth2.ClientConfigError
      | google.accounts.oauth2.CodeResponse;
    config: Omit<
      google.accounts.oauth2.CodeClientConfig,
      "callback" | "error_callback"
    >;
  };

  googleAuthToken: {
    success: google.accounts.oauth2.TokenResponse;
    error:
      | google.accounts.oauth2.ClientConfigError
      | google.accounts.oauth2.TokenResponse;
    config: Omit<
      google.accounts.oauth2.TokenClientConfig,
      "callback" | "error_callback"
    >;
  };

  googleOneTap: {
    success: google.accounts.id.CredentialResponse;
    error: Error;
    config: Omit<
      google.accounts.id.IdConfiguration,
      "callback" | "native_callback" | "intermediate_iframe_close_callback"
    >;
  };

  // Standard OAuth 2.0 Authorization Code Flow Platforms
  atlassian: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "additionalParams"
    >;
  };

  discord: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "scopeJoiner"
    >;
  };

  dropbox: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  facebook: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_reason?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  figma: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  github: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
    >;
  };

  gitlab: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  instagram: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_reason?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  linkedin: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  microsoft: {
    success: {
      code: string;
      state?: string;
      session_state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
      admin_consent_required?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "prompt"
    >;
  };

  notion: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "additionalParams"
    >;
  };

  paypal: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  reddit: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "duration"
    >;
  };

  slack: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
    >;
  };

  spotify: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
  };

  tiktok: {
    success: {
      code: string;
      state?: string;
      scopes?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientKey"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "scopeJoiner"
    >;
  };

  twitch: {
    success: {
      code: string;
      state?: string;
      scope?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "claims"
    >;
  };

  twitter: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "codeVerifier"
    >;
  };

  zoom: {
    success: {
      code: string;
      state?: string;
    };
    error: {
      error: string;
      error_description?: string;
      error_uri?: string;
      state?: string;
    };
    config: Pick<
      GenerateOauthUrlProps,
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
    >;
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
