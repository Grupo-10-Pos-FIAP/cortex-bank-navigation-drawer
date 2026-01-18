import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  isWindowAvailable,
} from "./windowUtils";
import { STORAGE_KEYS } from "@/constants";
import { AccountIdChangedEvent } from "@/types/events";

export function getAccountId(): string | null {
  return getLocalStorageItem(STORAGE_KEYS.ACCOUNT_ID);
}

export function setAccountId(accountId: string): void {
  if (setLocalStorageItem(STORAGE_KEYS.ACCOUNT_ID, accountId)) {
    if (isWindowAvailable()) {
      const event = new CustomEvent("accountIdChanged", {
        detail: { accountId },
      }) as AccountIdChangedEvent;
      window.dispatchEvent(event);
    }
  }
}

export function removeAccountId(): void {
  removeLocalStorageItem(STORAGE_KEYS.ACCOUNT_ID);
}
