import React from "react";
import { Text } from "@grupo10-pos-fiap/design-system";
import { formatAccountNumber } from "@/utils/accountUtils";
import { UserIcon, ChevronDownIcon } from "./Icons";
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
  const formattedAccount = formatAccountNumber(accountNumber);

  return (
    <div
      className={styles.userProfile}
      role="region"
      aria-label="Perfil do usuário"
    >
      <div className={styles.userIcon} aria-hidden="true">
        <UserIcon />
      </div>
      <div className={styles.userInfo}>
        <Text variant="subtitle" weight="bold" className={styles.userName}>
          {userName.toUpperCase()}
        </Text>
        <Text variant="small" className={styles.accountInfo}>
          Agência {agency} Conta {formattedAccount}
        </Text>
      </div>
      <div className={styles.dropdownIndicator} aria-hidden="true">
        <ChevronDownIcon />
      </div>
    </div>
  );
};
