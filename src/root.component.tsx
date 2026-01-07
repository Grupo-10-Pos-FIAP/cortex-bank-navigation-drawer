import React, { useState, useEffect, useCallback, useMemo } from "react";
import { navigateToUrl } from "single-spa";
import { Dropdown, Text, Loading } from "@grupo10-pos-fiap/design-system";
import { fetchAccounts, Account } from "./api/account.api";
import { getAccountId, setAccountId } from "./utils/accountStorage";
import { HomeIcon, StatementIcon, TransactionIcon, ChevronRightIcon } from "./components/Icons";
import "./styles/tokens.css";
import styles from "./NavigationDrawer.module.css";

export default function Root() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const accountsData = await fetchAccounts();
      setAccounts(accountsData);

      // Se não há conta selecionada, usar a primeira conta ou a do localStorage
      const storedAccountId = getAccountId();
      if (accountsData.length > 0) {
        const accountToSelect = storedAccountId && accountsData.find((acc) => acc.id === storedAccountId)
          ? storedAccountId
          : accountsData[0].id;
        
        setSelectedAccountId(accountToSelect);
        setAccountId(accountToSelect);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar contas");
      console.error("Erro ao carregar contas:", err);
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
    const account = accounts.find((acc) => acc.id === selectedAccountId) || accounts[0];
    return getAccountLabel(account);
  };

  // Formatar data atual
  const currentDate = useMemo(() => {
    const date = new Date();
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  }, []);

  // Obter nome do usuário (pode vir do localStorage ou API)
  const userName = useMemo(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("userName") || "*usuário*";
    }
    return "*usuário*";
  }, []);

  // Detectar rota atual
  const currentPath = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "";
  }, []);

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

  if (loading) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <Loading text="Carregando..." size="small" />
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <Text variant="body" color="error" style={{ marginBottom: "var(--spacing-md)" }}>
            {error}
          </Text>
          <button onClick={loadAccounts} className={styles.retryButton}>
            Tentar novamente
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Header com saudação e data */}
        <div className={styles.header}>
          <Text variant="subtitle" weight="bold" className={styles.greeting}>
            Bem vindo, {userName}
          </Text>
          <Text variant="small" color="gray600" className={styles.date}>
            {currentDate}
          </Text>
        </div>

        {/* Select de contas */}
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

        {/* Links de navegação */}
        <nav className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${isActive("/dashboard") || isActive("/") ? styles.navLinkActive : ""}`}
            onClick={() => navigateToUrl("/dashboard")}
          >
            <div className={styles.navLinkContent}>
              <HomeIcon />
              <Text variant="body" weight={isActive("/dashboard") || isActive("/") ? "semibold" : "regular"}>
                Inicio
              </Text>
            </div>
            <ChevronRightIcon />
          </button>

          <button
            className={`${styles.navLink} ${isActive("/statement") ? styles.navLinkActive : ""}`}
            onClick={() => navigateToUrl("/statement")}
          >
            <div className={styles.navLinkContent}>
              <StatementIcon />
              <Text variant="body" weight={isActive("/statement") ? "semibold" : "regular"}>
                Extrato
              </Text>
            </div>
            <ChevronRightIcon />
          </button>

          <button
            className={`${styles.navLink} ${isActive("/transactions") ? styles.navLinkActive : ""}`}
            onClick={() => navigateToUrl("/transactions")}
          >
            <div className={styles.navLinkContent}>
              <TransactionIcon />
              <Text variant="body" weight={isActive("/transactions") ? "semibold" : "regular"}>
                Transação
              </Text>
            </div>
            <ChevronRightIcon />
          </button>
        </nav>
      </div>
    </aside>
  );
}
