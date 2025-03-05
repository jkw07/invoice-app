import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";

export const useInvoicesNavigation = () => {
  const navigate = useNavigate();
  const goToInvoicesList = () => navigate(ROUTES.INVOICES);
  const goToNewInvoice = () => navigate(ROUTES.INVOICES + "/new");
  return (
    {goToInvoicesList, goToNewInvoice}
  )
}