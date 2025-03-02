import { ROUTES } from "./config/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//TODO zm. browser router
import "./styles/app.scss";
import { MainHomePage } from "./pages/MainHomePage";
import { InvoicesHomePage } from "./modules/invoices/pages/InvoicesHomePage";
import { ProductsHomePage } from "./modules/products/pages/ProductsHomePage";
import { ClientsHomePage } from "./modules/clients/pages/ClientsHomePage";
import { RemindersHomePage } from "./modules/reminders/pages/RemindersHomePage";
import { SettingsHomePage } from "./modules/settings/pages/SettingsHomePage";
import { ReportsHomePage } from "./modules/reports/pages/ReporstHomePage";
import { DashboardLayout } from "./layouts/DashboardLayout";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<MainHomePage />} />
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.INVOICES + "/*"} element={<InvoicesHomePage />} />
          <Route path={ROUTES.PRODUCTS + "/*"} element={<ProductsHomePage />} />
          <Route path={ROUTES.CLIENTS + "/*"} element={<ClientsHomePage />} />
          <Route
            path={ROUTES.REMINDERS + "/*"}
            element={<RemindersHomePage />}
          />
          <Route path={ROUTES.SETTINGS + "/*"} element={<SettingsHomePage />} />
          <Route path={ROUTES.REPORTS + "/*"} element={<ReportsHomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

//TODO dodac store i provider
