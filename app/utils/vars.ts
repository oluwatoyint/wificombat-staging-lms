// API base URL — driven by NEXT_PUBLIC_BASE_URL set in Vercel dashboard.
// Falls back to production URL if the variable is not set.
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://wificombat-staging-backend-production.up.railway.app";

export const SERVER_URL = BASE_URL;

// Versioned API aliases used by some modules.
// If your backend uses a single base URL for all versions, they all point to BASE_URL.
export const API = process.env.NEXT_PUBLIC_BASE_URL_2 ?? BASE_URL;
export const API_VERSION_ONE = process.env.NEXT_PUBLIC_BASE_URL_1 ?? BASE_URL;
export const API_VERSION_THREE = process.env.NEXT_PUBLIC_BASE_URL_3 ?? BASE_URL;
export const API_VERSION_FOUR = process.env.NEXT_PUBLIC_BASE_URL_4 ?? BASE_URL;

export const periods = [
  { name: "This week", value: "this_week" },
  { name: "Last 7 days", value: "last_7days" },
  { name: "Last 6 months", value: "last_6months" },
  { name: "1 Year", value: "year" },
];

export const react_select_style1 = (base: any) => ({
  ...base,
  paddingTop: "8px",
  paddingBottom: "8px",
  ":active": { boxShadow: "none", borderColor: "#4b5563" },
  ":focus": { boxShadow: "none", borderColor: "#4b5563" },
  ":hover": { boxShadow: "none", borderColor: "#4b5563" },
  border: "1.8px solid #4b5563",
  boxShadow: "none",
  borderRadius: "4px",
});

export const react_select_options = [
  { label: "Teaching", value: "Teaching" },
  { label: "Coding", value: "Coding" },
  { label: "Movies", value: "Movies" },
  { label: "Dancing", value: "Dancing" },
];

export const item_key = "selected-item-to-view";
export const course_to_purchase = "course_to_purchase";
