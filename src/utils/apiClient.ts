function getAuthToken(): string | null {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("token");
  }
  return null;
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

  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`Erro na requisição: ${response.status} ${errorText}`);
  }

  return response;
}

