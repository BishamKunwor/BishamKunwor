import type { GenerateOauthUrlProps, SocialPlatforms } from "./types";

export const socialMediaConfig: Partial<
  Record<SocialPlatforms | "google", Partial<GenerateOauthUrlProps>>
> = {
  apple: {
    authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
    scopes: ["email", "name"],
    responseMode: "form_post",
    responseType: "code id_token",
  },
  atlassian: {
    authorizationEndpoint: "https://auth.atlassian.com/authorize",
    responseType: "code",
    prompt: "consent",
    additionalParams: {
      audience: "api.atlassian.com",
    },
  },
  discord: {
    authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
    scopes: ["identify", "email"],
    responseType: "code",
    prompt: "consent",
  },
  dropbox: {
    authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
    scopes: ["account_info.read"],
    responseType: "code",
  },
  facebook: {
    authorizationEndpoint: "https://www.facebook.com/v21.0/dialog/oauth",
    scopes: ["email", "public_profile"],
  },
  figma: {
    authorizationEndpoint: "https://www.figma.com/oauth",
    scopes: ["current_user:read"],
    responseType: "code",
  },
  github: {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    scopes: ["read:user", "user:email"],
  },
  gitlab: {
    authorizationEndpoint: "https://gitlab.com/oauth/authorize",
    scopes: ["read_user"],
    responseType: "code",
  },
  google: {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    additionalParams: {
      include_granted_scopes: "true",
    },
  },
  instagram: {
    authorizationEndpoint: "https://instagram.com/oauth/authorize",
    scopes: ["instagram_business_basic"],
  },
  linkedin: {
    authorizationEndpoint: "https://www.linkedin.com/oauth/v2/authorization",
    scopes: ["profile", "email", "openid"],
  },
  // microsoft: {
  //   authorizationEndpoint:
  //     "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
  //   scopes: ["openid", "profile", "email", "User.Read", "offline_access"],
  // },
  notion: {
    authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize",
    scopes: [],
    additionalParams: {
      owner: "user",
    },
    responseType: "code",
  },
  // reddit: {
  //   authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
  //   scopes: ["identity"],
  // },
  slack: {
    authorizationEndpoint: "https://slack.com/openid/connect/authorize",
    scopes: ["openid", "profile", "email"],
    responseType: "code",
  },
  // spotify: {
  //   authorizationEndpoint: "https://accounts.spotify.com/authorize",
  //   scopes: ["user-read-email"],
  //   responseType: "code",
  // },
  tiktok: {
    authorizationEndpoint: "https://www.tiktok.com/v2/auth/authorize",
    scopes: ["user.info.basic"],
    scopeJoiner: ",",
    responseType: "code",
  },
  twitch: {
    authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
    scopes: ["user:read:email", "openid"],
    claims: ["email", "email_verified", "preferred_username", "picture"],
    responseType: "token",
  },
  twitter: {
    authorizationEndpoint: "https://x.com/i/oauth2/authorize",
    scopes: ["users.read", "tweet.read", "offline.access", "users.email"],
    responseType: "code",
  },
  zoom: {
    authorizationEndpoint: "https://zoom.us/oauth/authorize",
    responseType: "code",
  },
};

export const SDK_SCRIPTS = {
  APPLE:
    "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js",
  GOOGLE: "https://accounts.google.com/gsi/client",
} satisfies Partial<Record<Uppercase<SocialPlatforms | "google">, string>>;
