export const ALERT_LEVELS = {
  1: { id: 1, label: "Do not notify me", threshold: "never" },
  2: { id: 2, label: "Any Discount", threshold: "anyDiscount" },
  3: { id: 3, label: "10% Off", threshold: 90 },
  4: { id: 4, label: "25% Off", threshold: 75 },
  5: { id: 5, label: "50% Off", threshold: 50 },
  6: { id: 6, label: "75% Off", threshold: 25 },
  7: { id: 7, label: "90% Off", threshold: 10 },
  8: { id: 8, label: "Lowest Ever", threshold: "lowest" },
};

export const LARGE_SPINNER = "large";

export const DEALS_CACHE_OFFSET = 1200000;

export const EXCLUDE_KEYWORDS = ["edition", "collection", "bundle", "pack"];
