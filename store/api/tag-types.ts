export const API_TAG_TYPES = [
  "Auth",
  "Hospital",
  "Patient",
  "Staff",
] as const;

export type ApiTagType = (typeof API_TAG_TYPES)[number];
