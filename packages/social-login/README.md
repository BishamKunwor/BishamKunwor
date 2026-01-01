A lightweight, framework-agnostic TypeScript library for implementing OAuth social login with multiple platforms.

## Features

- 🚀 **Framework Agnostic** - Works with React, Vue, Svelte, or vanilla JavaScript
- 🔒 **Type-Safe** - Full TypeScript support with platform-specific types
- 🎯 **Multiple Platforms** - Support for 20+ OAuth providers
- 🔄 **Flexible Configuration** - Global and platform-specific settings
- 🛡️ **Error Handling** - Type-safe error handling with platform-specific error types
- 🪟 **Popup Support** - Automatic popup window management for URL-based flows

## Installation

```bash
npm install @bisham/social-login
# or
pnpm add @bisham/social-login
# or
yarn add @bisham/social-login
```

## Quick Start

### 1. Configure OAuth Platforms

First, set up your OAuth platform configurations:

```typescript
import { configOauthPlatforms } from "@bisham/social-login";

const { connectSocialPlatform } = configOauthPlatforms(
  {
    github: {
      clientId: "your-github-client-id",
      redirectURI: "http://localhost:3000/auth/callback",
      state: "random-state-string",
      scopes: ["read:user", "user:email"],
    },
    googleAuthCode: {
      client_id: "your-google-client-id",
      redirect_uri: "http://localhost:3000/auth/callback",
      scope: "email profile",
    },
    discord: {
      clientId: "your-discord-client-id",
      redirectURI: "http://localhost:3000/auth/callback",
      state: "random-state-string",
      scopes: ["identify", "email"],
    },
  },
  {
    defaultRedirectURI: "http://localhost:3000/auth/callback", // Used when platform doesn't specify redirectURI
  }
);
```

### 2. Connect to a Social Platform

```typescript
try {
  const response = await connectSocialPlatform("github");
  console.log("Authorization code:", response.code);
  // Use the code to exchange for access token on your backend
} catch (error) {
  console.error("OAuth error:", error);
}
```

### 3. Handle Redirect Callback (URL-based flows)

For URL-based OAuth flows, you need to handle the redirect callback. Create a callback page that calls `oauthResponseSubscription()`:

**Example with TanStack Start:**

```tsx
// routes/verify-social-link.tsx
import { oauthResponseSubscription } from "@bisham/social-login";
import { useEffect } from "react";

export default function VerifySocialLink() {
  useEffect(() => {
    oauthResponseSubscription();
  }, []);

  return <div>Verifying...</div>;
}
```

**Example with Next.js:**

```tsx
// pages/auth/callback.tsx
import { oauthResponseSubscription } from "@bisham/social-login";
import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    oauthResponseSubscription();
  }, []);

  return <div>Processing authentication...</div>;
}
```

**Example with React Router:**

```tsx
// routes/AuthCallback.tsx
import { oauthResponseSubscription } from "@bisham/social-login";
import { useEffect } from "react";

export function AuthCallback() {
  useEffect(() => {
    oauthResponseSubscription();
  }, []);

  return <div>Completing authentication...</div>;
}
```

## Configuration

### Global Configuration

The `configOauthPlatforms` function accepts a second parameter for global settings:

```typescript
const { connectSocialPlatform } = configOauthPlatforms(
  {
    // Platform configurations
  },
  {
    defaultRedirectURI: "https://yourapp.com/auth/callback", // Fallback redirect URI
  }
);
```

**Redirect URI Priority:**

1. Platform-specific `redirectURI` (if set)
2. Global `defaultRedirectURI` (if set)
3. `window.location.origin` (fallback)

### Platform-Specific Configuration

Each platform has its own configuration requirements. Here are examples for common platforms:

#### GitHub

```typescript
{
  github: {
    clientId: "your-github-client-id",
    redirectURI: "http://localhost:3000/auth/callback",
    state: "random-state-string",
    scopes: ["read:user", "user:email"],
    // Optional
    codeVerifier: "pkce-code-verifier", // For PKCE flow
    prompt: "consent",
    additionalParams: {
      // Custom query parameters
    },
  }
}
```

#### Discord

```typescript
{
  discord: {
    clientId: "your-discord-client-id",
    redirectURI: "http://localhost:3000/auth/callback",
    state: "random-state-string",
    scopes: ["identify", "email"],
    prompt: "consent",
  }
}
```

#### Google (Auth Code Flow)

```typescript
{
  googleAuthCode: {
    client_id: "your-google-client-id",
    redirect_uri: "http://localhost:3000/auth/callback",
    scope: "email profile",
    // Optional
    state: "random-state-string",
    hd: "example.com", // Hosted domain
    login_hint: "user@example.com",
  }
}
```

#### Google (Token Flow)

```typescript
{
  googleAuthToken: {
    client_id: "your-google-client-id",
    scope: "email profile",
    // Optional
    state: "random-state-string",
    hd: "example.com",
  }
}
```

#### Google One Tap

```typescript
{
  googleOneTap: {
    client_id: "your-google-client-id",
    auto_select: false,
    cancel_on_tap_outside: true,
    // See google.accounts.id.IdConfiguration for all options
  }
}
```

#### Apple Sign In

```typescript
{
  apple: {
    clientId: "your-apple-client-id",
    redirectURI: "https://yourapp.com/auth/callback",
    scope: "email name",
    usePopup: true, // or false for redirect flow
    // See AppleSignInAPI.ClientConfigI for all options
  }
}
```

#### Twitter (OAuth 2.0)

```typescript
{
  twitter: {
    clientId: "your-twitter-client-id",
    redirectURI: "http://localhost:3000/auth/callback",
    state: "random-state-string",
    scopes: ["users.read", "tweet.read", "offline.access"],
    codeVerifier: "pkce-code-verifier", // Required for Twitter
    // Optional
    additionalParams: {},
  }
}
```

#### TikTok

```typescript
{
  tiktok: {
    clientKey: "your-tiktok-client-key", // Note: uses clientKey, not clientId
    redirectURI: "http://localhost:3000/auth/callback",
    state: "random-state-string",
    scopes: ["user.info.basic"],
  }
}
```

#### Atlassian

```typescript
{
  atlassian: {
    clientId: "your-atlassian-client-id",
    redirectURI: "http://localhost:3000/auth/callback",
    state: "random-state-string",
    scopes: ["read:jira-user", "read:jira-work"], // Required
    prompt: "consent",
    additionalParams: {
      audience: "api.atlassian.com",
    },
  }
}
```

## Complete Authentication Example

Here's a complete example showing how to implement authentication in your application:

```tsx
// auth.tsx
import { useState } from "react";
import { configOauthPlatforms, isOauthError } from "@bisham/social-login";
import type { SocialPlatforms } from "@bisham/social-login";

const { connectSocialPlatform } = configOauthPlatforms(
  {
    github: {
      clientId: "your-github-client-id",
      redirectURI: "http://localhost:3000/auth/callback",
      state: "random-state-string",
      scopes: ["read:user", "user:email"],
    },
    googleAuthCode: {
      client_id: "your-google-client-id",
      redirect_uri: "http://localhost:3000/auth/callback",
      scope: "email profile",
    },
    discord: {
      clientId: "your-discord-client-id",
      redirectURI: "http://localhost:3000/auth/callback",
      state: "random-state-string",
      scopes: ["identify", "email"],
    },
  },
  {
    defaultRedirectURI: "http://localhost:3000/auth/callback",
  }
);

export function AuthPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (platform: SocialPlatforms) => {
    setLoading(platform);
    setError(null);

    try {
      const response = await connectSocialPlatform(platform);

      // Send the response to your backend
      const result = await fetch("/api/auth/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          data: response,
        }),
      });

      if (!result.ok) {
        throw new Error("Authentication failed");
      }

      const user = await result.json();
      console.log("Authenticated user:", user);
      // Handle successful authentication (redirect, update state, etc.)
    } catch (err) {
      if (isOauthError(err, platform)) {
        // Handle platform-specific OAuth error
        console.error("OAuth error:", err.errorResponse);
        setError(`OAuth error: ${JSON.stringify(err.errorResponse)}`);
      } else {
        // Handle other errors
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <h1>Sign in with Social</h1>

      <button
        onClick={() => handleSocialLogin("github")}
        disabled={loading !== null}
      >
        {loading === "github" ? "Connecting..." : "Sign in with GitHub"}
      </button>

      <button
        onClick={() => handleSocialLogin("googleAuthCode")}
        disabled={loading !== null}
      >
        {loading === "googleAuthCode" ? "Connecting..." : "Sign in with Google"}
      </button>

      <button
        onClick={() => handleSocialLogin("discord")}
        disabled={loading !== null}
      >
        {loading === "discord" ? "Connecting..." : "Sign in with Discord"}
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
```

## Error Handling

The library provides type-safe error handling through the `isOauthError` utility function:

```typescript
import { isOauthError } from "@bisham/social-login";

try {
  const response = await connectSocialPlatform("github");
  // Handle success
} catch (error) {
  if (isOauthError(error, "github")) {
    // TypeScript knows error.errorResponse is GitHub's error type
    console.error("OAuth error:", error.errorResponse);
    // error.errorResponse has type: { error: string; error_description?: string; error_uri?: string; state?: string; }
  } else {
    // Handle other errors (network, popup blocked, etc.)
    console.error("Other error:", error);
  }
}
```

### Platform-Specific Error Types

Each platform has its own error response type. For example:

- **GitHub**: `{ error: string; error_description?: string; error_uri?: string; state?: string; }`
- **Discord**: `{ error: string; error_description?: string; state?: string; }`
- **Google**: `google.accounts.oauth2.ClientConfigError | google.accounts.oauth2.CodeResponse`
- **Apple**: `AppleSignInAPI.SignInErrorI`

## Supported Platforms

- **Apple**
- **Atlassian**
- **Discord**
- **Dropbox**
- **Facebook**
- **Figma**
- **GitHub**
- **GitLab**
- **Google (Auth Code, Token, One Tap)**
- **Instagram**
- **LinkedIn**
- **Notion**
- **Slack**
- **TikTok**
- **Twitch**
- **Twitter**
- **Zoom**

## API Reference

### `configOauthPlatforms(config, globalConfig?)`

Main configuration function that returns a `connectSocialPlatform` function.

**Parameters:**

- `config`: `ConfigOauthPlatformsProps` - Platform-specific configurations
- `globalConfig?`: `{ defaultRedirectURI?: string }` - Global configuration options

**Returns:**

- `{ connectSocialPlatform: (platform: SocialPlatforms) => Promise<SocialSuccessResponse<Platform>> }`

### `connectSocialPlatform(platform)`

Initiates OAuth flow for the specified platform.

**Parameters:**

- `platform`: `SocialPlatforms` - The platform to connect to

**Returns:**

- `Promise<SocialSuccessResponse<Platform>>` - Platform-specific success response

**Throws:**

- `OauthError<Platform>` - Platform-specific OAuth error
- `Error` - Other errors (popup blocked, network errors, etc.)

### `oauthResponseSubscription()`

Handles OAuth redirect callback. Call this function in your redirect/callback page.

**Usage:**

```typescript
import { oauthResponseSubscription } from "@bisham/social-login";

// Call in your callback page component
oauthResponseSubscription();
```

### `isOauthError(error, platform)`

Type guard to check if an error is a platform-specific OAuth error.

**Parameters:**

- `error`: `unknown` - The error to check
- `platform`: `SocialPlatforms` - The platform type

**Returns:**

- `boolean` - True if the error is an OAuthError for the specified platform

## Configuration Options

### Common OAuth Options

```typescript
{
  clientId?: string;           // OAuth client ID (most platforms)
  clientKey?: string;          // OAuth client key (TikTok)
  redirectURI?: string;        // Redirect URI after authorization
  state?: string;              // State parameter for CSRF protection
  scopes?: string[];           // Requested scopes
  codeVerifier?: string;       // PKCE code verifier
  prompt?: string;             // Prompt parameter (e.g., "consent", "select_account")
  accessType?: string;         // Access type (e.g., "offline" for refresh tokens)
  responseType?: string;       // Response type (usually "code")
  display?: string;            // Display mode
  loginHint?: string;          // Login hint
  hd?: string;                // Hosted domain (Google)
  responseMode?: string;       // Response mode
  additionalParams?: Record<string, string>; // Additional query parameters
  scopeJoiner?: string;        // Character to join scopes (default: " ")
}
```

## How It Works

### URL-Based Flows (Most Platforms)

1. User clicks "Sign in with [Platform]"
2. `connectSocialPlatform()` opens a popup window with the OAuth authorization URL
3. User authorizes the application
4. Platform redirects to your `redirectURI` with authorization code/error
5. `oauthResponseSubscription()` captures the response and stores it in a cookie
6. Popup closes and the promise resolves/rejects with the response
7. Your application handles the response (exchange code for token, etc.)

### SDK-Based Flows (Apple, Google)

1. User clicks "Sign in with [Platform]"
2. `connectSocialPlatform()` loads the platform SDK (if not already loaded)
3. SDK handles the authentication flow
4. Promise resolves/rejects with the SDK response
5. Your application handles the response

## TypeScript Support

The library is fully typed with TypeScript. All platform configurations, responses, and errors are type-safe:

```typescript
import type {
  SocialPlatforms,
  SocialSuccessResponse,
  SocialErrorResponse,
  SocialPlatformConfig,
} from "@bisham/social-login";

// Platform-specific types
type GitHubResponse = SocialSuccessResponse<"github">;
type GitHubError = SocialErrorResponse<"github">;
type GitHubConfig = SocialPlatformConfig<"github">;
```

## Browser Support

- Modern browsers with ES6+ support
- Requires cookie support for redirect handling

## License

MIT

## Author

**Bisham Kunwor**

- Email: novelian.nova@gmail.com
- Website: https://bishamkunwor.com.np
