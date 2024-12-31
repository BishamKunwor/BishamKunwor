import dayjs from "dayjs";

// Decode JWT Token to get expiry time
function base64UrlDecode(token: string): {
  exp: number;
  [index: string]: unknown;
} {
  try {
    const str = token.split(".")[1];
    const padded = str + "=".repeat((4 - (str.length % 4)) % 4);
    // Decode the Base64 URL encoded string
    return JSON.parse(decodeURIComponent(escape(window.atob(padded))));
  } catch (error) {
    return { exp: dayjs().unix() };
  }
}

/**
 * @param token Token to verify if it is expired or not
 * @param offset time in seconds below which the isTokenExpired return true
 * e.g. `isTokenExpired('token-with-20-seconds-expiry-time', 20)` will trigger true only when the token expiry time reches below 20 seconds threshold
 * @returns boolean
 */
export default function isTokenExpired(token: string, offset: number = 15) {
  const { exp } = base64UrlDecode(token);

  return dayjs(exp).diff(dayjs().unix()) < offset;
}

// export function getTokenExpiryTime(token: string) {
//   const { exp } = base64UrlDecode(token);

//   return exp;
// }
