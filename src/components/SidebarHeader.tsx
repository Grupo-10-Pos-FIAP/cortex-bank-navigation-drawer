import React from "react";
import { Text } from "@grupo10-pos-fiap/design-system";
import { formatCurrentDate } from "@/utils/dateUtils";
import { getLocalStorageItem } from "@/utils/windowUtils";
import { STORAGE_KEYS, MESSAGES } from "@/constants";
import styles from "../NavigationDrawer.module.css";

export function SidebarHeader() {
  const userName = getLocalStorageItem(STORAGE_KEYS.USER_NAME) || "";
  const currentDate = formatCurrentDate();

  return (
    <div className={styles.header}>
      <Text variant="subtitle" weight="bold" className={styles.greeting}>
        {MESSAGES.WELCOME} {userName}
      </Text>
      <Text variant="small" color="gray600" className={styles.date}>
        {currentDate}
      </Text>
    </div>
  );
}
