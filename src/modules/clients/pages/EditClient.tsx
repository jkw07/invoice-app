import { AlertColor, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/buttons.scss";
import { AlertDialog } from "../../../components/AlertDialog";
import Button from "@mui/material/Button";
import { Client } from "../types";
import { ClientForm } from "../components/ClientForm";
import { getClientById, updateClient } from "../../../services/clientService";
import { useParams } from "react-router-dom";

export const EditClient = () => {
  const { id: clientId } = useParams();
  const [formData, setFormData] = useState<Client>({
    id: "",
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!clientId) return;
    const fetchClientData = async () => {
      setIsLoading(true);
      setOpenDialog(false);
      try {
        const data = await getClientById(clientId);
        if (data && !Array.isArray(data)) {
          setFormData(data as Client);
        } else {
          setOpenDialog(true);
          setAlertSeverity("error");
          setAlertMessage("Nie znaleziono klienta.");
        }
      } catch (error) {
        console.error("Error fetching client:", error);
        setOpenDialog(true);
        setAlertSeverity("error");
        setAlertMessage("Wystąpił błąd podczas pobierania danych.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchClientData();
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (clientId) {
        await updateClient(clientId, formData);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Nieprawidłowy identyfikator klienta.");
        setOpenDialog(true);
      }
      setAlertSeverity("success");
      setAlertMessage("Dane klienta zostały zaktualizowane pomyślnie.");
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Wystąpił błąd podczas aktualizacji danych.");
      console.log(error);
    } finally {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <h2>Edytuj dane klienta</h2>
      <NavLink to="/clients" className="link-button">
        <Button>Powrót</Button>
      </NavLink>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <ClientForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
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
