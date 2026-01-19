export const MOBILE_BREAKPOINT = 768;

export const ROUTES = {
  DASHBOARD: "/dashboard",
  STATEMENT: "/statement",
  TRANSACTIONS: "/transactions",
  AUTH: "/auth",
  ROOT: "/",
} as const;

export const MESSAGES = {
  LOADING: "Carregando...",
  SELECT_ACCOUNT: "Selecione uma conta",
  NO_ACCOUNTS: "Nenhuma conta disponível",
  RETRY: "Tentar novamente",
  ERROR_LOADING_ACCOUNTS: "Erro ao carregar contas",
  WELCOME: "Bem vindo",
} as const;

export const STORAGE_KEYS = {
  ACCOUNT_ID: "accountId",
  TOKEN: "token",
  USER_NAME: "userName",
} as const;
