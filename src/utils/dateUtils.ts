import { DAYS_OF_WEEK } from "@/constants";

/**
 * Formata a data atual no formato: "Dia da semana, DD/MM/YYYY"
 */
export function formatCurrentDate(): string {
  const date = new Date();
  const dayName = DAYS_OF_WEEK[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${dayName}, ${day}/${month}/${year}`;
}
