import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";

export function useNavigation() {
  const navigate = useNavigate();

  return {
    goToInvoicesModule: () => navigate(ROUTES.INVOICES),
    goToProductsModule: () => navigate(ROUTES.PRODUCTS),
    goToClientsModule: () => navigate(ROUTES.CLIENTS),
    goToRemindersModule: () => navigate(ROUTES.REMINDERS),
    goToSettingsModule: () => navigate(ROUTES.SETTINGS),
    goToReportsModule: () => navigate(ROUTES.REPORTS),
  };
}