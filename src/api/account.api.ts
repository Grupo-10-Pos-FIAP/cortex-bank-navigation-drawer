import { fetchApi } from "@/utils/apiClient";

export interface Account {
  id: string;
  type: string;
  userId: string;
}

export interface AccountResponse {
  message: string;
  result: {
    account: Account[];
    transactions: unknown[];
    cards: unknown[];
  };
}

export async function fetchAccounts(): Promise<Account[]> {
  try {
    const response = await fetchApi("/account");
    const data: AccountResponse = await response.json();

    if (!data.result.account || data.result.account.length === 0) {
      return [];
    }

    return data.result.account;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Erro ao buscar contas");
  }
}

