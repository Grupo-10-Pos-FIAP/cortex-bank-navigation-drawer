import React, { useCallback, useEffect } from "react";
import { navigateToUrl } from "single-spa";
import { Text, Loading } from "@grupo10-pos-fiap/design-system";
import { useMobile } from "./hooks/useMobile";
import { useCurrentPath } from "./hooks/useCurrentPath";
import { useAccounts } from "./hooks/useAccounts";
import { SidebarHeader } from "./components/SidebarHeader";
import { ErrorMessage } from "./components/ErrorMessage";
import { AccountSelector } from "./components/AccountSelector";
import { NavLink } from "./components/NavLink";
import {
  HomeIcon,
  StatementIcon,
  TransactionIcon,
  LogoutIcon,
} from "./components/Icons";
import { ROUTES, MESSAGES } from "./constants";
import { clearLocalStorage } from "./utils/windowUtils";
import "./styles/tokens.css";
import styles from "./NavigationDrawer.module.css";

const NAV_ITEMS = [
  {
    path: ROUTES.ROOT,
    route: ROUTES.DASHBOARD,
    icon: <HomeIcon />,
    label: "Inicio",
  },
  {
    path: ROUTES.STATEMENT,
    route: ROUTES.STATEMENT,
    icon: <StatementIcon />,
    label: "Extrato",
  },
  {
    path: ROUTES.TRANSACTIONS,
    route: ROUTES.TRANSACTIONS,
    icon: <TransactionIcon />,
    label: "Transação",
  },
] as const;

export default function Root() {
  const { isMobile, isSidebarOpen, closeSidebar } = useMobile();
  const currentPath = useCurrentPath();
  const {
    accounts,
    selectedAccountId,
    loading,
    error,
    handleAccountChange,
    retryLoadAccounts,
  } = useAccounts();

  const handleNavigate = useCallback(
    (url: string) => {
      if (isMobile) {
        closeSidebar();
      }
      navigateToUrl(url);
    },
    [isMobile, closeSidebar]
  );

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile && isSidebarOpen) {
        closeSidebar();
      }
    };

    window.addEventListener("single-spa:routing-event", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("single-spa:routing-event", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isMobile, isSidebarOpen, closeSidebar]);

  const isActive = (path: string) => {
    if (path === ROUTES.ROOT) {
      return currentPath === ROUTES.ROOT || currentPath === ROUTES.DASHBOARD;
    }
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  const handleLogout = useCallback(() => {
    clearLocalStorage();
    navigateToUrl(ROUTES.AUTH);
  }, []);

  if (loading) {
    return (
      <aside
        className={`${styles.sidebar} ${
          isMobile && isSidebarOpen ? styles.open : ""
        }`}
      >
        <div className={styles.sidebarContent}>
          <Loading text={MESSAGES.LOADING} size="small" />
        </div>
      </aside>
    );
  }

  const showError = error && accounts.length === 0;

  return (
    <aside
      className={`${styles.sidebar} ${
        isMobile && isSidebarOpen ? styles.open : ""
      }`}
    >
      <div className={styles.sidebarContent}>
        <SidebarHeader />

        {showError && (
          <ErrorMessage message={error} onRetry={retryLoadAccounts} />
        )}

        <AccountSelector
          accounts={accounts}
          selectedAccountId={selectedAccountId}
          onAccountChange={handleAccountChange}
        />

        {!showError && accounts.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <Text variant="small" color="gray600">
              {MESSAGES.NO_ACCOUNTS}
            </Text>
          </div>
        )}

        <nav className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              onClick={() => handleNavigate(item.route)}
            />
          ))}
        </nav>

        <button
          className={`${styles.navLink} ${styles.logoutButton}`}
          onClick={handleLogout}
        >
          <div className={styles.navLinkContent}>
            <LogoutIcon />
            <Text variant="body" weight="regular">
              Sair
            </Text>
          </div>
        </button>
      </div>
    </aside>
  );
}
