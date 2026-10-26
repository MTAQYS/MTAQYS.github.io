export const offers = [
  { id: "intelligence", fromEur: 3500 },
  { id: "flux", fromEur: 1200 },
  { id: "fondations", fromEur: 900 },
  { id: "surmesure", fromEur: 6000 },
] as const;

export const dailyRateEur = 450;
export const supportMonthlyEur = 150;

export type OfferId = (typeof offers)[number]["id"];
