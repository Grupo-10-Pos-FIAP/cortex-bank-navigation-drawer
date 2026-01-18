import React from "react";
import { Text } from "@grupo10-pos-fiap/design-system";
import { ChevronRightIcon } from "./Icons";
import styles from "../NavigationDrawer.module.css";

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function NavLink({ icon, label, isActive, onClick }: NavLinkProps) {
  return (
    <button
      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
      onClick={onClick}
    >
      <div className={styles.navLinkContent}>
        {icon}
        <Text variant="body" weight={isActive ? "semibold" : "regular"}>
          {label}
        </Text>
      </div>
      <ChevronRightIcon />
    </button>
  );
}
