import { paths } from "./utils/paths";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.scss";
import { MainHomePage } from "./pages/MainHomePage";
import { InvoicesHomePage } from "./modules/invoices/pages/InvoicesHomePage";
import { ProductsHomePage } from "./modules/products/pages/ProductsHomePage";
import { ClientsHomePage } from "./modules/clients/pages/ClientsHomePage";
import { RemindersHomePage } from "./modules/reminders/pages/RemindersHomePage";
import { SettingsHomePage } from "./modules/settings/pages/SettingsHomePage";
import { ReportsHomePage } from "./modules/reports/pages/ReportsHomePage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { plPL } from "@mui/material/locale";
import { AuthListener } from "./services/AuthListener";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  const theme = createTheme({}, plPL);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthListener />
        <Routes>
          <Route path={paths.HOME} element={<MainHomePage />} />
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path={paths.CLIENTS} element={<ClientsHomePage />} />
            <Route path={paths.INVOICES} element={<InvoicesHomePage />} />
            <Route path={paths.PRODUCTS} element={<ProductsHomePage />} />
            <Route path={paths.REMINDERS} element={<RemindersHomePage />} />
            <Route path={paths.SETTINGS} element={<SettingsHomePage />} />
            <Route path={paths.REPORTS} element={<ReportsHomePage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
