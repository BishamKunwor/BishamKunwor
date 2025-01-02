import type { AxiosInstance } from "axios";
import type { PropsWithChildren } from "react";
import type useDedupeNewTokenRequest from "./use-dedupe-new-token-request";

export type AuthContextType =
  | {
      isAuthenticated: boolean;
      signIn: (accessToken: string) => void;
      signOut: () => void;
      getAccessToken: () => Promise<string>;
    }
  | undefined;

export interface AuthProviderProps extends PropsWithChildren {
  axiosInstance: AxiosInstance;
  defaultValue?: {
    accessToken?: string;
  };
  debug?: boolean;
  getAccessToken: () => Promise<{ accessToken: string }>;
  onSignOut: () => any;
}

export type RefreshDedupeUnion =
  | {
      isFetchingTokens: false;
      refetchAxiosInstance: undefined;
    }
  | {
      isFetchingTokens: true;
      refetchAxiosInstance: Promise<{ accessToken: string }>;
    };

export type ReactUseState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface UseDedupeNewTokenRequestProps {
  setAccessToken: ReactUseState<string | undefined>;
  getAccessToken: () => Promise<{ accessToken: string }>;
}

export interface UseRequestHandlerProps {
  accessToken: string | undefined;
  axiosPrivate: AxiosInstance;
  getNewTokens: ReturnType<typeof useDedupeNewTokenRequest>["getNewTokens"];
}

export interface UseResponseHandlerProps {
  axiosPrivate: AxiosInstance;
  getNewTokens: ReturnType<typeof useDedupeNewTokenRequest>["getNewTokens"];
}
