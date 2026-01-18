import { useState, useEffect, useCallback } from "react";
import { fetchAccounts, Account } from "@/api/account.api";
import { getAccountId, setAccountId } from "@/utils/accountStorage";
import { MESSAGES } from "@/constants";

interface UseAccountsReturn {
  accounts: Account[];
  selectedAccountId: string | null;
  loading: boolean;
  error: string | null;
  handleAccountChange: (accountId: string) => void;
  retryLoadAccounts: () => void;
}

export function useAccounts(): UseAccountsReturn {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        err instanceof Error ? err.message : MESSAGES.ERROR_LOADING_ACCOUNTS;
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

  return {
    accounts,
    selectedAccountId,
    loading,
    error,
    handleAccountChange,
    retryLoadAccounts: loadAccounts,
  };
}
