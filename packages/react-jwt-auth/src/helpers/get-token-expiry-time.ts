import devlog from "./devlog";

export default function getTokenExpiryTime(token: string) {
  try {
    const parts = token.split(".");
    const { exp = undefined } = JSON.parse(atob(parts[1])) || {};

    if (typeof exp === "number") {
      return exp;
    }
  } catch (error) {
    devlog("AUTH-LOG: Failed to Parse Expiry Time");
  }
}
