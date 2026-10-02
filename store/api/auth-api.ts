import { baseApi } from "@/store/api/base-api";
import type { RegisterValues } from "@/lib/auth/register-schema";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  jobTitle: string;
  phone: string;
  role: string;
  status: string;
  facilityId: string;
  image?: string | null;
};

export type AuthFacility = {
  id: string;
  legalName: string;
  displayName: string;
  type: string;
  licenseNumber: string;
  country: string;
  city: string;
  address: string;
  plan: string;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
  facility: AuthFacility;
};

export type MeResponse = {
  user: AuthUser;
  facility: AuthFacility;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      AuthResponse,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "Dashboard"],
    }),
    register: build.mutation<AuthResponse, RegisterValues>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    me: build.query<MeResponse, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
    logout: build.mutation<{ ok: boolean }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useLogoutMutation,
} = authApi;
