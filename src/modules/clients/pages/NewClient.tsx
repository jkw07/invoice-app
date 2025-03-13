import { AlertColor } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addClient } from "../../../services/clientService";
import "../../../styles/buttons.scss";
import { AlertDialog } from "../../../components/AlertDialog";
import Button from "@mui/material/Button";
import { ClientForm } from "../components/ClientForm";
import { ImportClient } from "../components/ImportClient";
import { useClientsStore } from "../store/clientsStore";

export const NewClient = () => {
  const { newClientData, setNewClientData, resetNewClientData } =
    useClientsStore();

  const [openDialog, setOpenDialog] = useState(false);
  const [openImportClientDialog, setOpenImportClientDialog] = useState(true);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClientData({ ...newClientData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addClient(newClientData);
      setAlertSeverity("success");
      setAlertMessage("Klient został dodany pomyślnie.");
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Wystąpił błąd podczas dodawania klienta.");
      console.error("Error adding client:", error);
    } finally {
      setOpenDialog(true);
    }

    resetNewClientData();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCloseImportClient = () => {
    setOpenImportClientDialog(false);
  };

  return (
    <>
      <h2>Nowy Klient</h2>
      <NavLink to="/clients" className="link-button">
        <Button>Powrót</Button>
      </NavLink>
      <ImportClient
        open={openImportClientDialog}
        handleClose={handleCloseImportClient}
      />
      <ClientForm
        formData={newClientData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleReset={resetNewClientData}
        hasReset={true}
      />
      <AlertDialog
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
    </>
  );
};
