import { Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

interface ImportClientProps {
  open: boolean;
  nipValue: string;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImportClient = ({
  open,
  handleClose,
  nipValue,
  handleChange,
}: ImportClientProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>
        <PersonSearchIcon sx={{ color: "#1976d2", fontSize: 40 }} />
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
  );
};
