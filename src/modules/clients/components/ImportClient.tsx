import {
  AlertColor,
  Box,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useState } from "react";
import { useClientsStore } from "../store/clientsStore";
import { AlertDialog } from "../../../components/AlertDialog";

interface ImportClientProps {
  open: boolean;
  handleClose: () => void;
}

interface Client {
  id: string;
  name: string;
  taxId: string;
  address: string;
  email: string;
  phone: string;
}

export const ImportClient = ({ open, handleClose }: ImportClientProps) => {
  const { setImportedClientData } = useClientsStore();
  const [isLoading, setLoading] = useState(false);
  const [nipValue, setNipValue] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [clientData, setClientData] = useState<Client>({
    id: "",
    name: "",
    taxId: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNipValue(e.target.value);
  };

  const fetchClientData = async (nip: string) => {
    try {
      const response = await fetch(`/api/api/ceidg/v2/firmy?nip=${nip}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer 2531`, //`Bearer ${API_KEY}` TODO: podmienić jak przyjdzie klucz
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        setAlertSeverity("error");
        setAlertMessage("Błąd autoryzacji. Sprawdź poprawność klucza API.");
        setOpenAlert(true);
        throw new Error("Unauthorized: Invalid API key");
      }

      if (response.status === 403) {
        setAlertSeverity("error");
        setAlertMessage("Brak uprawnień do dostępu do API.");
        setOpenAlert(true);
        throw new Error("Forbidden: No access to the API");
      }
      if (!response.ok) {
        setAlertSeverity("error");
        setAlertMessage("Nie znaleziono klienta");
        setOpenAlert(true);
        throw new Error("Client not found");
      }
      const data = await response.json();
      setClientData({
        id: data.id || "",
        name: data.name || "",
        taxId: data.nip || "",
        address: `${data.address.street} ${data.address.number}, ${data.address.city}`,
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (error) {
      console.error("Błąd:", error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setAlertSeverity("error");
        setAlertMessage(
          "Błąd połączenia: problem z CORS lub API jest niedostępne."
        );
        setOpenAlert(true);
      } else {
        setAlertSeverity("error");
        if (error instanceof Error) {
          setAlertMessage(error.message);
          setOpenAlert(true);
        } else {
          setAlertMessage("An unknown error occurred");
          setOpenAlert(true);
        }
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await fetchClientData(nipValue);
    setImportedClientData(clientData);
    setLoading(false);
    handleClose();
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit,
            sx: { backgroundImage: "none" },
          },
        }}
      >
        <DialogTitle>
          <PersonSearchIcon sx={{ color: "#1976d2", fontSize: 40 }} />
          {isLoading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            gap: 2,
            width: "90%",
          }}
        >
          <DialogContentText>
            Uzupełnij NIP klienta aby pobrać jego dane z CEiDG
          </DialogContentText>
          <TextField
            required
            label="NIP Klienta"
            margin="normal"
            name="nip"
            placeholder="NIP Klienta"
            variant="outlined"
            fullWidth
            autoFocus
            value={nipValue}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: 3,
            px: 3,
            gap: 2,
          }}
        >
          <Button variant="contained" type="submit">
            Kontunuuj
          </Button>
          <Divider sx={{ width: "100%" }}>lub</Divider>
          <Button onClick={handleClose}>Uzupełnij dane klienta ręcznie</Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        openDialog={openAlert}
        handleDialogClose={handleAlertClose}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
    </>
  );
};
