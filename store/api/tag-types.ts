export const API_TAG_TYPES = [
  "Auth",
  "Facility",
  "Resident",
  "Claim",
  "Invoice",
  "Contact",
  "Team",
  "Analytics",
  "Dashboard",
] as const;

export type ApiTagType = (typeof API_TAG_TYPES)[number];
