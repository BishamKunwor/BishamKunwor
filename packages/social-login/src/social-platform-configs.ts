import type { GenerateOauthUrlProps } from "./types";

export const socialMediaConfig = {
  apple: {
    authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
    scopes: ["email", "name"],
    responseMode: "form_post",
    responseType: "code id_token",
  },
  atlassian: {
    authorizationEndpoint: "https://auth.atlassian.com/authorize",
    scopes: ["read:jira-user", "offline_access"],
    additionalParams: {
      audience: "api.atlassian.com",
    },
  },
  discord: {
    authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
    scopes: ["identify", "email"],
    scopeJoiner: "+",
  },
  dropbox: {
    authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
    scopes: ["account_info.read"],
  },
  facebook: {
    authorizationEndpoint: "https://www.facebook.com/v21.0/dialog/oauth",
    scopes: ["email", "public_profile"],
  },
  figma: {
    authorizationEndpoint: "https://www.figma.com/oauth",
    scopes: ["file_read"],
  },
  github: {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    scopes: ["read:user", "user:email"],
  },
  gitlab: {
    authorizationEndpoint: "https://gitlab.com/oauth/authorize",
    scopes: ["read_user"],
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
  microsoft: {
    authorizationEndpoint:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    scopes: ["openid", "profile", "email", "User.Read", "offline_access"],
  },
  notion: {
    authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize",
    scopes: [],
    additionalParams: {
      owner: "user",
    },
  },
  paypal: {
    authorizationEndpoint: "https://www.sandbox.paypal.com/signin/authorize",
    scopes: [],
  },
  reddit: {
    authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
    scopes: ["identity"],
  },
  slack: {
    authorizationEndpoint: "https://slack.com/openid/connect/authorize",
    scopes: ["openid", "profile", "email"],
  },
  spotify: {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    scopes: ["user-read-email"],
  },
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
  },
  twitter: {
    authorizationEndpoint: "https://x.com/i/oauth2/authorize",
    scopes: ["users.read", "tweet.read", "offline.access", "users.email"],
  },
  zoom: {
    authorizationEndpoint: "https://zoom.us/oauth/authorize",
    scopes: undefined,
    responseType: "code",
  },
} satisfies Record<string, Partial<GenerateOauthUrlProps>>;
