import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
