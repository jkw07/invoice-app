import logo from "../../public/assets/logo/logo2.png";
import { ModuleContainer } from "../components/ModuleContainer";
import { useNavigation } from "../hooks/useNavigation";
import {
  FileText,
  ShoppingCart,
  Users,
  Bell,
  Settings,
  ChartArea,
} from "lucide-react";

export const MainHomePage = () => {
  const {
    goToInvoicesModule,
    goToProductsModule,
    goToClientsModule,
    goToRemindersModule,
    goToSettingsModule,
    goToReportsModule,
  } = useNavigation();
  return (
    <div className="app">
      <div className="main-logo">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="modules-container">
        <ModuleContainer
          text="Faktury"
          onClick={goToInvoicesModule}
          Icon={FileText}
        />
        <ModuleContainer
          text="Produkty"
          onClick={goToProductsModule}
          Icon={ShoppingCart}
        />
        <ModuleContainer
          text="Klienci"
          onClick={goToClientsModule}
          Icon={Users}
        />
        <ModuleContainer
          text="Przypomnienia"
          onClick={goToRemindersModule}
          Icon={Bell}
        />
        <ModuleContainer
          text="Raporty"
          onClick={goToReportsModule}
          Icon={ChartArea}
        />
        <ModuleContainer
          text="Ustawienia"
          onClick={goToSettingsModule}
          Icon={Settings}
        />
      </div>
    </div>
  );
};
