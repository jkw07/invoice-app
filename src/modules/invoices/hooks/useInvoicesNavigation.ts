import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";

export function useInvoicesNavigation() {
  const navigate = useNavigate();

  return {
    goToInvoicesList: () => navigate(ROUTES.INVOICES),
    goToNewInvoice: () => navigate(ROUTES.INVOICES + "/new"),
  };
}