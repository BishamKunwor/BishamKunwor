import { useLayoutEffect } from "react";

export default function useDebug(debug: boolean) {
  useLayoutEffect(() => {
    // @ts-expect-error
    globalThis.react_jwt_auth_debug = debug;
  }, [debug]);
}
