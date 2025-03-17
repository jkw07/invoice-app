import { useUserStore } from "../../../../store/currentUserStore";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { deleteUserAccount } from "../../../../services/authService";

export const DeleteAccount = () => {
  const user = useUserStore((state) => state.user);
  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    setError("");
    try {
      await deleteUserAccount(password);
      setTimeout(() => {
        handleCloseDialog();
        window.location.reload();
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setError("Wystąpił błąd. Spróbuj ponownie.");
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <p>Login:</p>
      <p>{user?.email || ""}</p>
      <Button variant="outlined" color="error" onClick={handleOpenDialog}>
        <DeleteIcon />
        Usuń konto
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Usuń konto</DialogTitle>
        <DialogContent>
          <p>Podaj hasło, aby potwierdzić usunięcie konta.</p>
          <TextField
            type="password"
            label="Hasło"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Usuń konto
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
