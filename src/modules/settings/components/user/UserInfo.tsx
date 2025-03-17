import {
  Alert,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  updateUserEmail,
  updateUserPassword,
} from "../../../../services/authService";
import { useUserStore } from "../../../../store/currentUserStore";

export const UserInfo = () => {
  const user = useUserStore((state) => state.user);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    password: "",
  });

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  if (!user) return <CircularProgress />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleCancel = () => {
    setFormData({ email: user?.email || "", password: "" });
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  };

  const handleUpdateEmail = async () => {
    try {
      await updateUserEmail(formData.email);
      useUserStore.getState().setUser({ ...user, email: formData.email });
      setIsEditingEmail(false);
      setSnackbar({
        open: true,
        message: "E-mail został zmieniony.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error email changing:", error);
      setSnackbar({
        open: true,
        message: "Nie udało się zmienić e-maila.",
        severity: "error",
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updateUserPassword(formData.password);
      setIsEditingPassword(false);
      setSnackbar({
        open: true,
        message: "Hasło zostało zmienione.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error password changing:", error);
      setSnackbar({
        open: true,
        message: "Nie udało się zmienić hasła.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <h3>Email</h3>

      {!isEditingEmail ? (
        <Button onClick={handleEditEmail}>Zmień adres email</Button>
      ) : (
        <>
          <Button onClick={handleUpdateEmail}>Zapisz</Button>
          <Button onClick={handleCancel}>Anuluj</Button>
        </>
      )}

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled={!isEditingEmail}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Data utworzenia"
        name="createdAt"
        value={
          user.metadata.creationTime
            ? new Date(user.metadata.creationTime).toLocaleString("pl-PL", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZoneName: "short",
              })
            : "Brak danych"
        }
        disabled
        fullWidth
        margin="normal"
      />

      <h3>Hasło</h3>

      {!isEditingPassword ? (
        <Button onClick={handleEditPassword}>Zmień hasło</Button>
      ) : (
        <>
          <Button onClick={handleUpdatePassword}>Zapisz</Button>
          <Button onClick={handleCancel}>Anuluj</Button>
        </>
      )}

      <TextField
        label={isEditingPassword ? "Nowe hasło" : "**********"}
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={!isEditingPassword}
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: { shrink: isEditingPassword },
        }}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert severity={snackbar.severity as "success" | "error"}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

/*export const UserInfo = () => {
  const [userData, setUserData] = useState<{
    email?: string;
    createdAt?: Date;
  }>({});
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      console.log("Pobieranie danych");
      try {
        const user = await getUserData();
        setUserData(user);
        setFormData({ email: user.email || "", password: "" });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleCancel = () => {
    setFormData({ email: userData.email || "", password: "" });
    setIsEditingEmail(false);
    setIsEditingPassword(false);
  };

  const handleUpdateEmail = async () => {
    try {
      await updateUserEmail(formData.email);
      setUserData((prev) => ({ ...prev, email: formData.email }));
      setIsEditingEmail(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await updateUserPassword(formData.password);
      setIsEditingPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const formatDate = (timestamp?: Timestamp | Date | number) => {
    if (!timestamp) return "";
    let date: Date;
    if (timestamp instanceof Timestamp) {
      date = timestamp.toDate();
    } else if (typeof timestamp === "number") {
      date = new Date(timestamp);
    } else {
      date = new Date(timestamp);
    }
    return date.toLocaleString("pl-PL", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  };

  return (
    <>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <h3>Email</h3>

      {!isEditingEmail ? (
        <Button onClick={handleEditEmail}>Zmień adres email</Button>
      ) : (
        <>
          <Button onClick={handleUpdateEmail}>Zapisz</Button>
          <Button onClick={handleCancel}>Anuluj</Button>
        </>
      )}

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled={!isEditingEmail}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Data utworzenia"
        name="createdAt"
        value={formatDate(userData.createdAt)}
        disabled
        fullWidth
        margin="normal"
      />

      <h3>Hasło</h3>

      {!isEditingPassword ? (
        <Button onClick={handleEditPassword}>Zmień hasło</Button>
      ) : (
        <>
          <Button onClick={handleUpdatePassword}>Zapisz</Button>
          <Button onClick={handleCancel}>Anuluj</Button>
        </>
      )}

      <TextField
        label={isEditingPassword ? "Nowe hasło" : "**********"}
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={!isEditingPassword}
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: { shrink: isEditingPassword },
        }}
      />
    </>
  );
};*/
