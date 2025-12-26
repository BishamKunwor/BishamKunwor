import { PlatformKeys } from "./types";

type OAuthErrorResponse = {
  error: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
};

type OAuthCodeResponse = {
  code: string;
  state: string;
};

type AppleSuccessResponse = {
  code: string;
  id_token: string;
  state: string;
  user?: string;
};

type AppleErrorResponse = OAuthErrorResponse;

type GoogleSuccessResponse = OAuthCodeResponse & {
  scope?: string;
  authuser?: string;
  prompt?: string;
  hd?: string;
};

type GoogleErrorResponse = OAuthErrorResponse;

type FacebookSuccessResponse = OAuthCodeResponse & {
  granted_scopes?: string;
};

type FacebookErrorResponse = OAuthErrorResponse & {
  error_reason?: string;
  error_code?: string;
};

type GitHubSuccessResponse = OAuthCodeResponse;

type GitHubErrorResponse = OAuthErrorResponse;

type LinkedInSuccessResponse = OAuthCodeResponse;

type LinkedInErrorResponse = OAuthErrorResponse;

type MicrosoftSuccessResponse = OAuthCodeResponse & {
  session_state?: string;
};

type MicrosoftErrorResponse = OAuthErrorResponse;

type TwitterSuccessResponse = OAuthCodeResponse & {
  code_challenge?: string;
  code_challenge_method?: string;
};

type TwitterErrorResponse = OAuthErrorResponse;

type TikTokSuccessResponse = OAuthCodeResponse & {
  code_challenge?: string;
  code_challenge_method?: string;
};

type TikTokErrorResponse = OAuthErrorResponse;

type InstagramSuccessResponse = OAuthCodeResponse;

type InstagramErrorResponse = OAuthErrorResponse;

type DiscordSuccessResponse = OAuthCodeResponse;

type DiscordErrorResponse = OAuthErrorResponse;

type SlackSuccessResponse = OAuthCodeResponse & {
  id_token?: string;
};

type SlackErrorResponse = OAuthErrorResponse;

type SpotifySuccessResponse = OAuthCodeResponse;

type SpotifyErrorResponse = OAuthErrorResponse;

type TwitchSuccessResponse = OAuthCodeResponse & {
  id_token?: string;
  scope?: string;
};

type TwitchErrorResponse = OAuthErrorResponse;

type RedditSuccessResponse = OAuthCodeResponse;

type RedditErrorResponse = OAuthErrorResponse;

type AtlassianSuccessResponse = OAuthCodeResponse;

type AtlassianErrorResponse = OAuthErrorResponse;

type DropboxSuccessResponse = OAuthCodeResponse;

type DropboxErrorResponse = OAuthErrorResponse;

type FigmaSuccessResponse = OAuthCodeResponse;

type FigmaErrorResponse = OAuthErrorResponse;

type GitLabSuccessResponse = OAuthCodeResponse;

type GitLabErrorResponse = OAuthErrorResponse;

type NotionSuccessResponse = OAuthCodeResponse;

type NotionErrorResponse = OAuthErrorResponse;

type PayPalSuccessResponse = OAuthCodeResponse;

type PayPalErrorResponse = OAuthErrorResponse;

type ZoomSuccessResponse = OAuthCodeResponse;

type ZoomErrorResponse = OAuthErrorResponse;

type SocialResponse = {
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

export type SocialSuccessResponse<T extends PlatformKeys> =
  SocialResponse[T]["success"];

export type SocialErrorResponse<T extends PlatformKeys> =
  SocialResponse[T]["error"];
