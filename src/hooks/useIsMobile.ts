import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const updateIsMobile = () => setIsMobile(mq.matches);

    updateIsMobile();
    mq.addEventListener("change", updateIsMobile);

    return () => mq.removeEventListener("change", updateIsMobile);
  }, [breakpoint]);

  return isMobile;
}
