export const EUR_TO_MAD = 11;

const localeTag = {
  fr: "fr-FR",
  en: "en-GB",
} as const;

export function formatMoney(locale: "fr" | "en", amount: number, currency: "EUR" | "MAD"): string {
  return new Intl.NumberFormat(localeTag[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMadFromEur(locale: "fr" | "en", eur: number): string {
  return formatMoney(locale, eur * EUR_TO_MAD, "MAD");
}
