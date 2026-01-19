import React from "react";
import { Text, Icon } from "@grupo10-pos-fiap/design-system";
import styles from "./UserProfile.module.css";

interface UserProfileProps {
  userName: string;
  accountNumber: string;
  agency?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  accountNumber,
  agency = "0001",
}) => {
  const formatAccountNumber = (accountId: string): string => {
    if (!accountId) return "";
    const numericOnly = accountId.replace(/\D/g, "");
    if (numericOnly.length >= 7) {
      const last7 = numericOnly.slice(-7);
      return `${last7.slice(0, 6)}-${last7.slice(6)}`;
    }
    if (numericOnly.length >= 6) {
      return `${numericOnly.slice(-6)}-${numericOnly.slice(-1)}`;
    }
    return accountId.slice(-7) || accountId;
  };

  const formattedAccount = formatAccountNumber(accountNumber);

  return (
    <div className={styles.userProfile}>
      <div className={styles.userIcon}>
        <Icon name="User" size="medium" color="primary" />
      </div>
      <div className={styles.userInfo}>
        <Text variant="subtitle" weight="bold" className={styles.userName}>
          {userName.toUpperCase()}
        </Text>
        <Text variant="small" className={styles.accountInfo}>
          Agência {agency} Conta {formattedAccount}
        </Text>
      </div>
      <div className={styles.dropdownIndicator}>
        <Icon name="ChevronDown" size="small" color="white" />
      </div>
    </div>
  );
};
