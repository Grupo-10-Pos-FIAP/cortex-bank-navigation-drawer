import React from "react";
import { Text } from "@grupo10-pos-fiap/design-system";
import { formatCurrentDate } from "@/utils/dateUtils";
import { getLocalStorageItem } from "@/utils/windowUtils";
import { STORAGE_KEYS, MESSAGES } from "@/constants";
import { ArrowLeftIcon } from "./Icons";
import styles from "../NavigationDrawer.module.css";

interface SidebarHeaderProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function SidebarHeader({ isMobile = false, onClose }: SidebarHeaderProps) {
  const userName = getLocalStorageItem(STORAGE_KEYS.USER_NAME) || "";
  const currentDate = formatCurrentDate();

  return (
    <div className={styles.header}>
      {isMobile && onClose && (
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar menu"
        >
          <ArrowLeftIcon />
        </button>
      )}
      <Text variant="subtitle" weight="bold" className={styles.greeting}>
        {MESSAGES.WELCOME} {userName}
      </Text>
      <Text variant="small" color="gray600" className={styles.date}>
        {currentDate}
      </Text>
    </div>
  );
}
