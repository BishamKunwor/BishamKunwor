import { useEffect, useState } from "react";
/**
 * @description This hooks provide online status and Triggers Re-render whenever online status Changes
 */
export default function useOnlineStatus() {
  const [status, setStatus] = useState<"online" | "offline">("online");

  useEffect(() => {
    const handler = () => {
      if (navigator.onLine) {
        setStatus("online");
      } else {
        setStatus("offline");
      }
    };

    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);

    return () => {
      window.removeEventListener("online", handler);
      window.removeEventListener("offline", handler);
    };
  }, []);

  return status;
}
