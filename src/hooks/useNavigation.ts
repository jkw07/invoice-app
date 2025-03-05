import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";

export function useNavigation() {
  const navigate = useNavigate();
  const goToInvoicesModule = () => navigate(ROUTES.INVOICES);
  const goToClientsModule = () => navigate(ROUTES.CLIENTS);
  return {
    goToInvoicesModule,
    goToClientsModule
  };
}