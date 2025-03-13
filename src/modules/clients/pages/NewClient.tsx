import { AlertColor } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addClient } from "../../../services/clientService";
import "../../../styles/buttons.scss";
import { AlertDialog } from "../../../components/AlertDialog";
import Button from "@mui/material/Button";
import { ClientForm } from "../components/ClientForm";

interface NewClient {
  name: string;
  taxId: string;
  address: string;
  email: string;
  phone: string;
}

export const NewClient = () => {
  const [formData, setFormData] = useState<NewClient>({
    name: "",
    taxId: "",
    address: "",
    email: "",
    phone: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );
  const [alertMessage, setAlertMessage] = useState("");

  const handleReset = () => {
    setFormData({ name: "", taxId: "", address: "", email: "", phone: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addClient(formData);
      setAlertSeverity("success");
      setAlertMessage("Klient został dodany pomyślnie.");
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Wystąpił błąd podczas dodawania klienta.");
      console.log(error);
    } finally {
      setOpenDialog(true);
    }

    handleReset();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <h2>Nowy Klient</h2>
      <NavLink to="/clients" className="link-button">
        <Button>Powrót</Button>
      </NavLink>
      <ClientForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleReset={handleReset}
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
