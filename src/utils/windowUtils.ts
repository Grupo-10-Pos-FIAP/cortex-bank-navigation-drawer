export function isWindowAvailable(): boolean {
  return typeof window !== "undefined";
}

export function isLocalStorageAvailable(): boolean {
  return isWindowAvailable() && typeof window.localStorage !== "undefined";
}

export function getLocalStorageItem(key: string): string | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.error(`Erro ao ler ${key} do localStorage:`, error);
    return null;
  }
}

export function setLocalStorageItem(key: string, value: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar ${key} no localStorage:`, error);
    return false;
  }
}

export function removeLocalStorageItem(key: string): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Erro ao remover ${key} do localStorage:`, error);
    return false;
  }
}

export function clearLocalStorage(): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error("Erro ao limpar localStorage:", error);
    return false;
  }
}

export function getCurrentPath(): string {
  if (!isWindowAvailable()) {
    return "";
  }
  return window.location.pathname;
}
