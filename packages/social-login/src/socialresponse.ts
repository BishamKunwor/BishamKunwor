import { PlatformKeys } from "./types";

/**
 * OAuth 2.0 Standard Error Response
 */
export type OAuthErrorResponse = {
  error: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
};

/**
 * OAuth 2.0 Standard Success Response (Authorization Code Flow)
 */
export type OAuthCodeResponse = {
  code: string;
  state: string;
};

/**
 * OpenID Connect ID Token Response
 */
export type OAuthIdTokenResponse = {
  id_token: string;
  state?: string;
};

/**
 * Apple OAuth Response
 * Uses form_post response mode and returns both code and id_token
 */
export type AppleSuccessResponse = {
  code: string;
  id_token: string;
  state: string;
  user?: string; // JSON string containing user info
};

export type AppleErrorResponse = OAuthErrorResponse;

/**
 * Google OAuth Response
 */
export type GoogleSuccessResponse = OAuthCodeResponse & {
  scope?: string;
  authuser?: string;
  prompt?: string;
  hd?: string;
};

export type GoogleErrorResponse = OAuthErrorResponse;

/**
 * Facebook OAuth Response
 */
export type FacebookSuccessResponse = OAuthCodeResponse & {
  granted_scopes?: string;
};

export type FacebookErrorResponse = OAuthErrorResponse & {
  error_reason?: string;
  error_code?: string;
};

/**
 * GitHub OAuth Response
 */
export type GitHubSuccessResponse = OAuthCodeResponse;

export type GitHubErrorResponse = OAuthErrorResponse;

/**
 * LinkedIn OAuth Response
 */
export type LinkedInSuccessResponse = OAuthCodeResponse;

export type LinkedInErrorResponse = OAuthErrorResponse;

/**
 * Microsoft OAuth Response
 */
export type MicrosoftSuccessResponse = OAuthCodeResponse & {
  session_state?: string;
};

export type MicrosoftErrorResponse = OAuthErrorResponse;

/**
 * Twitter/X OAuth Response
 */
export type TwitterSuccessResponse = OAuthCodeResponse & {
  code_challenge?: string;
  code_challenge_method?: string;
};

export type TwitterErrorResponse = OAuthErrorResponse;

/**
 * TikTok OAuth Response
 */
export type TikTokSuccessResponse = OAuthCodeResponse & {
  code_challenge?: string;
  code_challenge_method?: string;
};

export type TikTokErrorResponse = OAuthErrorResponse;

/**
 * Instagram OAuth Response
 */
export type InstagramSuccessResponse = OAuthCodeResponse;

export type InstagramErrorResponse = OAuthErrorResponse;

/**
 * Discord OAuth Response
 */
export type DiscordSuccessResponse = OAuthCodeResponse;

export type DiscordErrorResponse = OAuthErrorResponse;

/**
 * Slack OAuth Response (OpenID Connect)
 */
export type SlackSuccessResponse = OAuthCodeResponse & {
  id_token?: string;
};

export type SlackErrorResponse = OAuthErrorResponse;

/**
 * Spotify OAuth Response
 */
export type SpotifySuccessResponse = OAuthCodeResponse;

export type SpotifyErrorResponse = OAuthErrorResponse;

/**
 * Twitch OAuth Response (OpenID Connect)
 */
export type TwitchSuccessResponse = OAuthCodeResponse & {
  id_token?: string;
  scope?: string;
};

export type TwitchErrorResponse = OAuthErrorResponse;

/**
 * Reddit OAuth Response
 */
export type RedditSuccessResponse = OAuthCodeResponse;

export type RedditErrorResponse = OAuthErrorResponse;

/**
 * Atlassian OAuth Response
 */
export type AtlassianSuccessResponse = OAuthCodeResponse;

export type AtlassianErrorResponse = OAuthErrorResponse;

/**
 * Dropbox OAuth Response
 */
export type DropboxSuccessResponse = OAuthCodeResponse;

export type DropboxErrorResponse = OAuthErrorResponse;

/**
 * Figma OAuth Response
 */
export type FigmaSuccessResponse = OAuthCodeResponse;

export type FigmaErrorResponse = OAuthErrorResponse;

/**
 * GitLab OAuth Response
 */
export type GitLabSuccessResponse = OAuthCodeResponse;

export type GitLabErrorResponse = OAuthErrorResponse;

/**
 * Notion OAuth Response
 */
export type NotionSuccessResponse = OAuthCodeResponse;

export type NotionErrorResponse = OAuthErrorResponse;

/**
 * PayPal OAuth Response
 */
export type PayPalSuccessResponse = OAuthCodeResponse;

export type PayPalErrorResponse = OAuthErrorResponse;

/**
 * Zoom OAuth Response
 */
export type ZoomSuccessResponse = OAuthCodeResponse;

export type ZoomErrorResponse = OAuthErrorResponse;

/**
 * Social Media OAuth Response Mapping
 * Maps each platform to its success and error response types
 */
export type SocialResponse = {
  apple: {
    success: AppleSuccessResponse;
    error: AppleErrorResponse;
  };
  atlassian: {
    success: AtlassianSuccessResponse;
    error: AtlassianErrorResponse;
  };
  discord: {
    success: DiscordSuccessResponse;
    error: DiscordErrorResponse;
  };
  dropbox: {
    success: DropboxSuccessResponse;
    error: DropboxErrorResponse;
  };
  facebook: {
    success: FacebookSuccessResponse;
    error: FacebookErrorResponse;
  };
  figma: {
    success: FigmaSuccessResponse;
    error: FigmaErrorResponse;
  };
  github: {
    success: GitHubSuccessResponse;
    error: GitHubErrorResponse;
  };
  gitlab: {
    success: GitLabSuccessResponse;
    error: GitLabErrorResponse;
  };
  google: {
    success: GoogleSuccessResponse;
    error: GoogleErrorResponse;
  };
  instagram: {
    success: InstagramSuccessResponse;
    error: InstagramErrorResponse;
  };
  linkedin: {
    success: LinkedInSuccessResponse;
    error: LinkedInErrorResponse;
  };
  microsoft: {
    success: MicrosoftSuccessResponse;
    error: MicrosoftErrorResponse;
  };
  notion: {
    success: NotionSuccessResponse;
    error: NotionErrorResponse;
  };
  paypal: {
    success: PayPalSuccessResponse;
    error: PayPalErrorResponse;
  };
  reddit: {
    success: RedditSuccessResponse;
    error: RedditErrorResponse;
  };
  slack: {
    success: SlackSuccessResponse;
    error: SlackErrorResponse;
  };
  spotify: {
    success: SpotifySuccessResponse;
    error: SpotifyErrorResponse;
  };
  tiktok: {
    success: TikTokSuccessResponse;
    error: TikTokErrorResponse;
  };
  twitch: {
    success: TwitchSuccessResponse;
    error: TwitchErrorResponse;
  };
  twitter: {
    success: TwitterSuccessResponse;
    error: TwitterErrorResponse;
  };
  zoom: {
    success: ZoomSuccessResponse;
    error: ZoomErrorResponse;
  };
};

/**
 * Type helper to extract success response type for a platform
 */
export type SocialSuccessResponse<T extends PlatformKeys> =
  SocialResponse[T]["success"];

/**
 * Type helper to extract error response type for a platform
 */
export type SocialErrorResponse<T extends PlatformKeys> =
  SocialResponse[T]["error"];
