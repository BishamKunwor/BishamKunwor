import { useEffect, useRef } from "react";
/**
 *
 * @param callback Callback to Run when Network and Event Loop is IDLE
 * @param timeout This timeout specifies time interval when event-loop and network are idle after which the callback gets executes
 */
export default function useBrowserResourceIdleCallback<
  Callback extends (...args: any[]) => any
>(callback: Callback, timeout: number = 5_000) {
  const callbackRef = useRef(callback);

  if (callbackRef.current !== callback) {
    callbackRef.current = callback;
  }

  useEffect(() => {
    // Timeout For Calling Callback when Network Is Idle
    let performanceIdleTimeout: number | NodeJS.Timeout | undefined;
    // ID for callback when event loop is idle
    let idleCallbackId: number | undefined;

    const performanceObserver = new PerformanceObserver((entries) => {
      const resourcesEntries = entries.getEntriesByType("resource");

      // Clear Timout if any resource load occurs
      clearTimeout(performanceIdleTimeout);

      if (resourcesEntries.length < 3) {
        // Resetting timeout when the network and browser are idle
        performanceIdleTimeout = setTimeout(() => {
          idleCallbackId = window.requestIdleCallback(callbackRef.current);
        }, timeout);
      }
    });

    // Only Observer Network Resources
    performanceObserver.observe({ entryTypes: ["resource"] });

    // Detach Event Listeners
    return () => {
      performanceObserver.disconnect();
      clearTimeout(performanceIdleTimeout);

      if (idleCallbackId) {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
  }, []);
}
