interface AppleIDAuthConfig {
  clientId: string;
  scope?: string;
  redirectURI: string;
  usePopup?: boolean;
  state?: string;
}

interface AppleID {
  auth: {
    init: (config: AppleIDAuthConfig) => void;
    signIn: (config?: AppleIDAuthConfig) => Promise<any>;
  };
}

interface Window {
  AppleID?: AppleID;
}
