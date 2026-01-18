import { getApiBaseUrl } from "@/config/api.config";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  isWindowAvailable,
} from "./windowUtils";
import { STORAGE_KEYS, ROUTES } from "@/constants";

function getAuthToken(): string | null {
  return getLocalStorageItem(STORAGE_KEYS.TOKEN);
}

export async function fetchApi(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const API_BASE_URL = getApiBaseUrl();

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeLocalStorageItem(STORAGE_KEYS.TOKEN);
        if (isWindowAvailable()) {
          window.location.href = ROUTES.AUTH;
        }
        const errorText = await response
          .text()
          .catch(() => response.statusText);
        throw new Error(`Erro na requisição: ${response.status} ${errorText}`);
      }
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`Erro na requisição: ${response.status} ${errorText}`);
    }

    return response;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        "Erro de conexão: Não foi possível conectar ao servidor. Verifique se o backend está rodando."
      );
    }
    if (error instanceof Error && error.message.includes("CORS")) {
      throw new Error(
        "Erro de CORS: O servidor não permite requisições desta origem."
      );
    }
    throw error;
  }
}
