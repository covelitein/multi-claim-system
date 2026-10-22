import { CmrPrintPage } from "@/components/dashboard/claims/cmr-print/cmr-print-page";

/** Outside the dashboard shell on purpose: this page is printed as-is. */
export default function CmrFormRoute() {
  return <CmrPrintPage />;
}
