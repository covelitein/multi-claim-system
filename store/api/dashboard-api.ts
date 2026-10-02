import type { AnalyticsPageData } from "@/lib/dashboard/analytics-data";
import type { ClaimsPageData, Claim } from "@/lib/dashboard/claims-data";
import type { ContactsPageData, ClientContact } from "@/lib/dashboard/contacts-data";
import type { DashboardHomeData } from "@/lib/dashboard/home-data";
import type { InvoicesPageData, Invoice } from "@/lib/dashboard/invoices-data";
import type { ResidentsPageData, Resident } from "@/lib/dashboard/residents-data";
import type { TeamPageData } from "@/lib/dashboard/team-data";
import { baseApi } from "@/store/api/base-api";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardHome: build.query<DashboardHomeData, void>({
      query: () => "/dashboard/home",
      providesTags: ["Dashboard"],
    }),
    getResidents: build.query<ResidentsPageData, void>({
      query: () => "/residents",
      providesTags: ["Resident"],
    }),
    createResident: build.mutation<
      Resident,
      {
        firstName: string;
        lastName: string;
        dob: string;
        phone: string;
        payer: string;
        admitDate: string;
        room?: string;
        status?: string;
        residentId?: string;
      }
    >({
      query: (body) => ({
        url: "/residents",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Resident", "Dashboard"],
    }),
    getClaims: build.query<ClaimsPageData, void>({
      query: () => "/claims",
      providesTags: ["Claim"],
    }),
    createClaim: build.mutation<
      Claim,
      {
        residentId: string;
        insurer: string;
        billingPeriod: string;
        policyId?: string;
        notes?: string;
        amountCents?: number;
        status?: string;
      }
    >({
      query: (body) => ({
        url: "/claims",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Claim", "Dashboard", "Analytics"],
    }),
    uploadClaimDocuments: build.mutation<
      { documents: { id: string; originalName: string }[] },
      { claimId: string; files: File[] }
    >({
      query: ({ claimId, files }) => {
        const form = new FormData();
        files.forEach((file) => form.append("files", file));
        return {
          url: `/claims/${claimId}/documents`,
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: ["Claim", "Dashboard"],
    }),
    getInvoices: build.query<InvoicesPageData, void>({
      query: () => "/invoices",
      providesTags: ["Invoice"],
    }),
    createInvoice: build.mutation<
      Invoice,
      {
        residentId: string;
        invoiceDate: string;
        servicePeriod: string;
        amountCents: number;
        invoiceId?: string;
        status?: string;
        matchedClaimId?: string | null;
      }
    >({
      query: (body) => ({
        url: "/invoices",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Invoice"],
    }),
    uploadInvoiceDocuments: build.mutation<
      { documents: { id: string; originalName: string }[] },
      { invoiceId: string; files: File[] }
    >({
      query: ({ invoiceId, files }) => {
        const form = new FormData();
        files.forEach((file) => form.append("files", file));
        return {
          url: `/invoices/${invoiceId}/documents`,
          method: "POST",
          body: form,
        };
      },
      invalidatesTags: ["Invoice"],
    }),
    getContacts: build.query<ContactsPageData, void>({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    createContact: build.mutation<
      ClientContact,
      Omit<ClientContact, "id" | "lastContacted"> & { lastContacted?: string }
    >({
      query: (body) => ({
        url: "/contacts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),
    getTeam: build.query<TeamPageData, void>({
      query: () => "/team",
      providesTags: ["Team"],
    }),
    inviteTeamMember: build.mutation<
      { id: string; email: string; role: string; token: string },
      { email: string; role?: "admin" | "billing_manager" | "staff" }
    >({
      query: (body) => ({
        url: "/team/invite",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
    getAnalytics: build.query<AnalyticsPageData, void>({
      query: () => "/analytics/summary",
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useGetDashboardHomeQuery,
  useGetResidentsQuery,
  useCreateResidentMutation,
  useGetClaimsQuery,
  useCreateClaimMutation,
  useUploadClaimDocumentsMutation,
  useGetInvoicesQuery,
  useCreateInvoiceMutation,
  useUploadInvoiceDocumentsMutation,
  useGetContactsQuery,
  useCreateContactMutation,
  useGetTeamQuery,
  useInviteTeamMemberMutation,
  useGetAnalyticsQuery,
} = dashboardApi;
