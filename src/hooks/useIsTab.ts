import { useEffect, useState } from "react";

export function useIsTab(minWidth = 768, maxWidth = 1024): boolean {
  const [isTab, setIsTab] = useState(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      return width >= minWidth && width <= maxWidth;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia(
      `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`,
    );
    const handler = (e: MediaQueryListEvent) => setIsTab(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [minWidth, maxWidth]);

  return isTab;
}
