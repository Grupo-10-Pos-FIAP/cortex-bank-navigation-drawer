export function formatAccountNumber(accountId: string): string {
  if (!accountId) return "";

  const numericOnly = accountId.replace(/\D/g, "");

  if (numericOnly.length >= 7) {
    const last7 = numericOnly.slice(-7);
    return `${last7.slice(0, 6)}-${last7.slice(6)}`;
  }

  if (numericOnly.length >= 6) {
    return `${numericOnly.slice(-6)}-${numericOnly.slice(-1)}`;
  }

  return accountId.slice(-7) || accountId;
}

export function formatAccountLastDigits(accountId: string): string {
  if (!accountId) return "";
  const numericOnly = accountId.replace(/\D/g, "");
  return numericOnly.slice(-4);
}

export function formatAccountLabel(
  accountType: string,
  accountId: string
): string {
  const lastDigits = formatAccountLastDigits(accountId);
  return `${accountType} - ${lastDigits}`;
}
