export default function devlog<T>(message: T, ...data: any[]) {
  // @ts-expect-error NOTE: will only log message when debug mode is configured
  if (globalThis.react_jwt_auth_debug) {
    console.log(message, ...data);
  }
}
