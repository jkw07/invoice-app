import { NavLink } from "react-router-dom";
import {
  FileText,
  ShoppingCart,
  Users,
  Bell,
  Settings,
  ChartArea,
  LogOut,
} from "lucide-react";
import { ROUTES } from "../config/routes";
import { logoutUser } from "../services/authService";
import logo from "../../public/assets/logo/logo1sidebar.png";

export const Sidebar = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="sidebar-nav">
        <NavLink to={ROUTES.INVOICES} className="sidebar-button">
          <FileText size={34} />
          <span className="sidebar-tooltip">Faktury</span>
        </NavLink>
        <NavLink to={ROUTES.PRODUCTS} className="sidebar-button">
          <ShoppingCart size={34} />
          <span className="sidebar-tooltip">Produkty</span>
        </NavLink>
        <NavLink to={ROUTES.CLIENTS} className="sidebar-button">
          <Users size={34} />
          <span className="sidebar-tooltip">Klienci</span>
        </NavLink>
        <NavLink to={ROUTES.REMINDERS} className="sidebar-button">
          <Bell size={34} />
          <span className="sidebar-tooltip">Powiadomienia</span>
        </NavLink>
        <NavLink to={ROUTES.REPORTS} className="sidebar-button">
          <ChartArea size={34} />
          <span className="sidebar-tooltip">Raporty</span>
        </NavLink>
        <NavLink to={ROUTES.SETTINGS} className="sidebar-button">
          <Settings size={34} />
          <span className="sidebar-tooltip">Ustawienia</span>
        </NavLink>
        <NavLink to={ROUTES.HOME} className="sidebar-button">
          <LogOut size={34} />
          <span className="sidebar-tooltip" onClick={handleLogout}>
            Wyloguj
          </span>
        </NavLink>
      </div>
    </nav>
  );
};
