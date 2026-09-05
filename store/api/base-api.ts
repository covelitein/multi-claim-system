import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/api/base-query";
import { API_TAG_TYPES } from "@/store/api/tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: API_TAG_TYPES,
  endpoints: () => ({}),
});
