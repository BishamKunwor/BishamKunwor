import dayjs from "dayjs";
import isEmpty from "./is-empty";
import { getTokenExpiryTime } from "./get-token-expiry-time";

/**
 * @param token Token to verify if it is expired or not
 * @param offset time in seconds below which the isTokenExpired return true
 * e.g. `isTokenExpired('token-with-20-seconds-expiry-time', 20)` will trigger true only when the token expiry time reches below 20 seconds threshold
 * @returns boolean
 */
export default function isTokenExpired(token: string, offset: number = 15) {
  const exp = getTokenExpiryTime(token);

  if (isEmpty(exp)) {
    return true;
  }

  return dayjs(exp).diff(dayjs().unix()) < offset;
}
