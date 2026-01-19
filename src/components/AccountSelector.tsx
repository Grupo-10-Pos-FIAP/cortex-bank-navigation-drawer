import React from "react";
import { Dropdown, Text } from "@grupo10-pos-fiap/design-system";
import { Account } from "@/api/account.api";
import { MESSAGES } from "@/constants";
import { formatAccountLabel } from "@/utils/accountUtils";
import styles from "../NavigationDrawer.module.css";

interface AccountSelectorProps {
  accounts: Account[];
  selectedAccountId: string | null;
  onAccountChange: (accountId: string) => void;
}

function getAccountLabel(account: Account): string {
  return formatAccountLabel(account.type, account.id);
}

function getSelectedAccountLabel(
  selectedAccountId: string | null,
  accounts: Account[]
): string {
  if (!selectedAccountId || accounts.length === 0) {
    return MESSAGES.SELECT_ACCOUNT;
  }
  const account =
    accounts.find((acc) => acc.id === selectedAccountId) || accounts[0];
  return getAccountLabel(account);
}

export function AccountSelector({
  accounts,
  selectedAccountId,
  onAccountChange,
}: AccountSelectorProps) {
  if (accounts.length === 0) {
    return null;
  }

  return (
    <div className={styles.accountSelectWrapper}>
      <Dropdown
        items={accounts.map((account) => ({
          label: getAccountLabel(account),
          value: account.id,
          onClick: () => {},
        }))}
        placeholder={getSelectedAccountLabel(selectedAccountId, accounts)}
        onValueChange={() => {}}
        width="100%"
      />
    </div>
  );
}
