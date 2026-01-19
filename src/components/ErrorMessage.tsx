import React from "react";
import { Text } from "@grupo10-pos-fiap/design-system";
import styles from "../NavigationDrawer.module.css";

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer} role="alert" aria-live="polite">
      <Text variant="small" color="error" className={styles.errorMessage}>
        {message}
      </Text>
      <button
        onClick={onRetry}
        className={styles.retryButton}
        aria-label="Tentar novamente"
      >
        Tentar novamente
      </button>
    </div>
  );
}
