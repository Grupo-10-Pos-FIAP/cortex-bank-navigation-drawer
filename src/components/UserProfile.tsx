import React from "react";
import { Text } from "@grupo10-pos-fiap/design-system";
import { formatAccountNumber } from "@/utils/accountUtils";
import { UserIcon } from "./Icons";
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
      <div className={styles.userNameRow}>
        <div className={styles.userIcon} aria-hidden="true">
          <UserIcon />
        </div>
        <Text variant="subtitle" weight="bold" className={styles.userName} style={{ color: 'white' }}>
          {userName.toUpperCase()}
        </Text>
      </div>
      <div className={styles.accountInfoRow}>
        <Text variant="small" className={styles.accountInfo} style={{ color: 'white' }}>
          Agência {agency}
        </Text>
        <Text variant="small" className={styles.accountInfo} style={{ color: 'white' }}>
          Conta {formattedAccount}
        </Text>
      </div>
    </div>
  );
};
