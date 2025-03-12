import { DefaultButton } from "../../../components/DefaultButton";
import { ClientsTableGrid } from "../components/ClientsTableGrid";
import { UserRoundPlus } from "lucide-react";
import "../styles/clientsList.scss";
import { NavLink } from "react-router-dom";

export const ClientsList = () => {
  return (
    <>
      <div className="clients-list-header">
        <h1>Lista klientów</h1>
      </div>
      <div className="clients-actions-container">
        <NavLink to="/clients/new" className="link-button">
          <DefaultButton text="Dodaj klienta" icon={<UserRoundPlus />} />
        </NavLink>
      </div>
      <div className="clients-table-container">
        <ClientsTableGrid />
      </div>
    </>
  );
};
