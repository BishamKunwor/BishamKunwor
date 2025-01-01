## Overview

`@bisham/react-jwt-auth` simplifies JWT authentication flow in your React apps by managing access tokens, including automatic handling of token expiration, refreshing tokens, and deduplication of token fetch requests.

## Features

- **JWT Token Validation**: Ensures that the JWT token format is correct and checks the expiration (`exp`) field.
- **Token Expiration Handling**: Automatically detects when the token has expired and triggers a refresh.
- **Automatic Token Refresh**: Supports automatic fetching of new access tokens and handles deduplication of token requests.
- **Secure Authorization Context**: Provides a context for managing the user's authentication state across your app.
- **Seamless Integration with Axios**: Automatically attaches the `Authorization` header with the correct access token in your `axios` requests.
- **Flexible Debugging**: Enables detailed debug logging to help you track the authentication flow.

## Installation

To install the package, run the following command:

```bash
npm install @bisham/react-jwt-auth
```

or

```bash
yarn add @bisham/react-jwt-auth
```

## Usage

### Setting Up the `AuthProvider`

Wrap your application with the `AuthProvider` component to manage authentication state across your app.

```jsx
import React from "react";
import { AuthProvider } from "@bisham/react-jwt-auth";
import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "https://api.example.com",
  // other axios configuration
});

const getAccessToken = async () => {
  // Implement your token fetching logic (e.g., from localStorage or a refresh API)
};

const App = () => {
  return (
    <AuthProvider
      axiosInstance={axiosPrivate}
      defaultValue={{ accessToken: localStorage.getItem("accessToken") }}
      getAccessToken={getAccessToken}
      debug
      onSignOut={() => console.log("Signed out")}
    >
      {/* Your app components */}
    </AuthProvider>
  );
};

export default App;
```

### Accessing Authentication State

You can access the authentication state anywhere in your app using the `useAuth` hook:

```jsx
import { useAuth } from "@bisham/react-jwt-auth";

const MyComponent = () => {
  const { isAuthenticated, signOut } = useAuth();

  const fetchData = async () => {
    try {
      // Authentication is Handled by AuthProvider Wrapper
      const response = await axiosPrivate.get("/protected-data", {});
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <button onClick={fetchData}>Fetch Protected Data</button>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <p>You are not authenticated</p>
      )}
    </div>
  );
};
```

### Handling Token Expiration

This package expects that the JWT token includes the `exp` (expiration) field in the payload. If the token is expired, the package will automatically try to refresh the token by calling the `getNewTokens` function you provide.

## API

### `AuthProvider`

- **Props**:
  - `axiosInstance` (required): An instance of Axios that will be used for authenticated requests.
  - `defaultValue` (optional): An object containing the initial `accessToken`.
  - `getAccessToken` (required): A function that fetches the access token.
  - `debug` (optional): Boolean flag to enable or disable debug logging (default: `false`).
  - `onSignOut` (optional): A callback function that is triggered when the user signs out.

### `useAuth`

- **Returns**: An object containing the following methods and properties:
  - `isAuthenticated`: Boolean indicating whether the user is authenticated.
  - `signIn(accessToken)`: Function to sign the user in with the provided `accessToken`.
  - `signOut()`: Function to sign the user out.
  - `getAccessToken()`: Function to get the current access token (or fetch a new one if expired).

## Important Notes

- The JWT `accessToken` must include the `exp` field in the payload for token expiration detection and refresh logic to work correctly.
- Make sure your token fetching logic in `getAccessToken` is set up properly to handle token expiration and refreshing.
- If you encounter issues or need debugging, enable the `debug` flag when using `AuthProvider` to get detailed logs.

## License

This package is licensed under the MIT License.

---

For any questions or feature requests, feel free to open an issue on the [GitHub repository](https://github.com/BishamKunwor/BishamKunwor/tree/main/packages/react-jwt-auth).
