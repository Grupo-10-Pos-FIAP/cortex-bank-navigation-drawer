import React, { useState, useEffect, useCallback, useMemo } from "react";
import { navigateToUrl } from "single-spa";
import { Dropdown, Text, Loading } from "@grupo10-pos-fiap/design-system";
import { fetchAccounts, Account } from "./api/account.api";
import { getAccountId, setAccountId } from "./utils/accountStorage";
import {
  HomeIcon,
  StatementIcon,
  TransactionIcon,
  ChevronRightIcon,
  LogoutIcon,
} from "./components/Icons";
import "./styles/tokens.css";
import styles from "./NavigationDrawer.module.css";

export default function Root() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
        window.dispatchEvent(new CustomEvent("sidebar-close"));
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleSidebarToggle = (event: CustomEvent) => {
      setIsSidebarOpen(event.detail.isOpen);
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
  }, [isSidebarOpen]);

  const closeSidebar = useCallback(() => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
      window.dispatchEvent(new CustomEvent("sidebar-close"));
    }
  }, [isMobile, isSidebarOpen]);

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

  const loadAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const accountsData = await fetchAccounts();
      setAccounts(accountsData);

      const storedAccountId = getAccountId();
      if (accountsData.length > 0) {
        const accountToSelect =
          storedAccountId &&
          accountsData.find((acc) => acc.id === storedAccountId)
            ? storedAccountId
            : accountsData[0].id;

        setSelectedAccountId(accountToSelect);
        setAccountId(accountToSelect);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar contas";
      setError(errorMessage);
      console.error("Erro ao carregar contas:", err);

      const storedAccountId = getAccountId();
      if (storedAccountId) {
        setSelectedAccountId(storedAccountId);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  const handleAccountChange = useCallback((accountId: string) => {
    setSelectedAccountId(accountId);
    setAccountId(accountId);
  }, []);

  const getAccountLabel = (account: Account): string => {
    return `${account.type} - ${account.id.slice(-4)}`;
  };

  const getSelectedAccountLabel = (): string => {
    if (!selectedAccountId || accounts.length === 0) {
      return "Selecione uma conta";
    }
    const account =
      accounts.find((acc) => acc.id === selectedAccountId) || accounts[0];
    return getAccountLabel(account);
  };

  const currentDate = useMemo(() => {
    const date = new Date();
    const days = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  }, []);

  const userName = useMemo(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("userName") || "";
    }
    return "";
  }, []);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "";
  });

  useEffect(() => {
    const updatePath = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
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

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/" || currentPath === "/dashboard";
    }
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.clear();
    }
    navigateToUrl("/auth");
  }, []);

  if (loading) {
    return (
      <aside
        className={`${styles.sidebar} ${
          isMobile && isSidebarOpen ? styles.open : ""
        }`}
      >
        <div className={styles.sidebarContent}>
          <Loading text="Carregando..." size="small" />
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
        <div className={styles.header}>
          <Text variant="subtitle" weight="bold" className={styles.greeting}>
            Bem vindo {userName}
          </Text>
          <Text variant="small" color="gray600" className={styles.date}>
            {currentDate}
          </Text>
        </div>

        {showError && (
          <div
            style={{
              padding: "var(--spacing-sm)",
              marginBottom: "var(--spacing-md)",
              backgroundColor: "#ffebee",
              border: "1px solid #ef5350",
              borderRadius: "4px",
            }}
          >
            <Text
              variant="small"
              color="error"
              style={{ marginBottom: "var(--spacing-xs)" }}
            >
              {error}
            </Text>
            <button
              onClick={loadAccounts}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {accounts.length > 0 && (
          <div className={styles.accountSelectWrapper}>
            <Dropdown
              items={accounts.map((account) => ({
                label: getAccountLabel(account),
                value: account.id,
                onClick: () => handleAccountChange(account.id),
              }))}
              placeholder={getSelectedAccountLabel()}
              onValueChange={handleAccountChange}
              width="100%"
            />
          </div>
        )}

        {!showError && accounts.length === 0 && !loading && (
          <div
            style={{
              padding: "var(--spacing-sm)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            <Text variant="small" color="gray600">
              Nenhuma conta disponível
            </Text>
          </div>
        )}

        <nav className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${
              isActive("/") ? styles.navLinkActive : ""
            }`}
            onClick={() => handleNavigate("/dashboard")}
          >
            <div className={styles.navLinkContent}>
              <HomeIcon />
              <Text
                variant="body"
                weight={isActive("/") ? "semibold" : "regular"}
              >
                Inicio
              </Text>
            </div>
            <ChevronRightIcon />
          </button>

          <button
            className={`${styles.navLink} ${
              isActive("/statement") ? styles.navLinkActive : ""
            }`}
            onClick={() => handleNavigate("/statement")}
          >
            <div className={styles.navLinkContent}>
              <StatementIcon />
              <Text
                variant="body"
                weight={isActive("/statement") ? "semibold" : "regular"}
              >
                Extrato
              </Text>
            </div>
            <ChevronRightIcon />
          </button>

          <button
            className={`${styles.navLink} ${
              isActive("/transactions") ? styles.navLinkActive : ""
            }`}
            onClick={() => handleNavigate("/transactions")}
          >
            <div className={styles.navLinkContent}>
              <TransactionIcon />
              <Text
                variant="body"
                weight={isActive("/transactions") ? "semibold" : "regular"}
              >
                Transação
              </Text>
            </div>
            <ChevronRightIcon />
          </button>
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
