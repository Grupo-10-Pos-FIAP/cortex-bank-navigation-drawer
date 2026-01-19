export interface SidebarToggleEvent extends CustomEvent {
  detail: {
    isOpen: boolean;
  };
}

export interface AccountIdChangedEvent extends CustomEvent {
  detail: {
    accountId: string;
  };
}

export interface SidebarCloseEvent extends CustomEvent {}

declare global {
  interface WindowEventMap {
    "sidebar-toggle": SidebarToggleEvent;
    "sidebar-close": SidebarCloseEvent;
    accountIdChanged: AccountIdChangedEvent;
  }
}
