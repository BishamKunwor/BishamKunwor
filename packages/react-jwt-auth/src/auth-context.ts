import { createContext, useContext } from "react";

import { isEmpty } from "./helpers";
import type { AuthContextType } from "./types";

const AuthContext = createContext<AuthContextType>(undefined);

function useAuth() {
  const appAuth = useContext(AuthContext);

  if (isEmpty(appAuth)) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return appAuth;
}

const AuthContextProvider = AuthContext.Provider;

export { useAuth, AuthContextProvider };
