import type { AxiosInstance } from "axios";
import type { PropsWithChildren } from "react";
import type useDedupeNewTokenRequest from "./use-dedupe-new-token-request";

type AccessTokenCallback = () => Promise<{ accessToken?: string } | undefined>;

export type AuthContextType =
  | {
      isAuthenticated: boolean;
      signIn: (accessToken: string) => void;
      signOut: () => void;
      getAccessToken: () => Promise<string | undefined>;
    }
  | undefined;

export interface AuthProviderProps extends PropsWithChildren {
  axiosInstance: AxiosInstance;
  defaultValue?: {
    accessToken?: string;
  };
  debug?: boolean;
  getAccessToken: AccessTokenCallback;
  onSignOut: () => any;
  onSignIn?: (accessToken: string) => any;
}

export type RefreshDedupeUnion =
  | {
      isFetchingTokens: false;
      refetchAxiosInstance: undefined;
    }
  | {
      isFetchingTokens: true;
      refetchAxiosInstance: ReturnType<AuthProviderProps["getAccessToken"]>;
    };

export type ReactUseState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface UseDedupeNewTokenRequestProps {
  setAccessToken: ReactUseState<string | undefined>;
  getAccessToken: AuthProviderProps["getAccessToken"];
}

export interface UseRequestHandlerProps {
  accessToken: string | undefined;
  axiosPrivate: AxiosInstance;
  getNewTokens: ReturnType<typeof useDedupeNewTokenRequest>["getNewTokens"];
}

export interface UseResponseHandlerProps {
  accessToken: string | undefined;
  axiosPrivate: AxiosInstance;
  getNewTokens: ReturnType<typeof useDedupeNewTokenRequest>["getNewTokens"];
}
