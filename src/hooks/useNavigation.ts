import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";

export function useNavigation() {
  const navigate = useNavigate();

  return {
    goToInvoicesModule: () => navigate(ROUTES.INVOICES)
  };
}