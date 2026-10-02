import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { getAccessToken, onUnauthorized } from "@/lib/auth/session";
import { API_BASE_URL } from "@/lib/config/env";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders(headers, { getState: _getState, endpoint: _endpoint, arg }) {
    headers.set("Accept", "application/json");

    const token = getAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Let the browser set multipart boundary for FormData uploads.
    const body =
      typeof arg === "object" && arg !== null && "body" in arg
        ? (arg as { body?: unknown }).body
        : undefined;
    if (body instanceof FormData) {
      headers.delete("Content-Type");
    }

    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    onUnauthorized();
  }

  return result;
};
