import { useState, useEffect } from "react";
import { getCurrentPath } from "@/utils/windowUtils";

export function useCurrentPath(): string {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    getCurrentPath()
  );

  useEffect(() => {
    const updatePath = () => {
      setCurrentPath(getCurrentPath());
    };

    updatePath();

    const handleRouteChange = () => {
      setTimeout(updatePath, 0);
    };

    const handlePopState = () => {
      updatePath();
    };

    window.addEventListener("single-spa:routing-event", handleRouteChange);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", updatePath);

    return () => {
      window.removeEventListener("single-spa:routing-event", handleRouteChange);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", updatePath);
    };
  }, []);

  return currentPath;
}
