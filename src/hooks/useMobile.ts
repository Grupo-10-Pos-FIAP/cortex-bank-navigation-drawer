import { useState, useEffect, useCallback } from "react";
import { MOBILE_BREAKPOINT } from "@/constants";
import { SidebarToggleEvent } from "@/types/events";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
    setIsMobile(mobile);

    if (!mobile && isSidebarOpen) {
      setIsSidebarOpen(false);
      window.dispatchEvent(new CustomEvent("sidebar-close"));
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as SidebarToggleEvent;
      setIsSidebarOpen(customEvent.detail.isOpen);
    };

    window.addEventListener(
      "sidebar-toggle",
      handleSidebarToggle as EventListener
    );

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener(
        "sidebar-toggle",
        handleSidebarToggle as EventListener
      );
    };
  }, [checkMobile]);

  const closeSidebar = useCallback(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
      window.dispatchEvent(new CustomEvent("sidebar-close"));
    }
  }, [isMobile, isSidebarOpen]);

  return {
    isMobile,
    isSidebarOpen,
    closeSidebar,
  };
}
