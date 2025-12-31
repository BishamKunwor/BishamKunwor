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

type WithRequiredOauthProps<
  OauthProps extends keyof GenerateOauthUrlProps,
  RequiredKeys extends OauthProps
> = {
  [K in OauthProps as K extends "clientId"
    ? never
    : K]?: GenerateOauthUrlProps[K];
} & Required<Pick<GenerateOauthUrlProps, RequiredKeys>>;

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
    config: WithRequiredOauthProps<
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "scopeJoiner"
      | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
      state?: string;
    };
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "prompt"
      | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "duration"
      | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      | "clientKey"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "scopeJoiner"
      | "additionalParams",
      "clientKey"
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
    config: WithRequiredOauthProps<
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "claims"
      | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      | "clientId"
      | "redirectURI"
      | "state"
      | "scopes"
      | "responseType"
      | "codeVerifier"
      | "additionalParams",
      "clientId"
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
    config: WithRequiredOauthProps<
      "clientId" | "redirectURI" | "state" | "scopes" | "responseType" | "additionalParams",
      "clientId"
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
