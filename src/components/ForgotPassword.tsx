import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useState } from "react";
import { resetPassword } from "../services/authService";
import { Alert } from "@mui/material";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export const ForgotPassword = ({ open, handleClose }: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const auth = getAuth();

      const formattedEmail = email.trim().toLowerCase();
      console.log("🔍 Sprawdzam e-mail:", formattedEmail);
      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        formattedEmail
      );
      console.log("Metody logowania dla:", formattedEmail, signInMethods);

      if (signInMethods.length === 0) {
        throw new Error("auth/user-not-found");
      }

      await resetPassword(email);
      setMessage("E-mail z linkiem do resetu hasła został wysłany.");
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "auth/user-not-found") {
        setError("Nie znaleziono użytkownika z tym adresem e-mail.");
      } else {
        setError("Wystąpił błąd. Spróbuj ponownie.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
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
      <DialogTitle>Resetuj hasło</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "90%" }}
      >
        <DialogContentText>
          Wpisz swój adres email przypisany do konta, a otrzymasz link do
          zresetowania hasła.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button variant="contained" type="submit">
          {loading ? "Wysyłanie..." : "Kontynuuj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
