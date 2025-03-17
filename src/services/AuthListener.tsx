import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "../store/currentUserStore";
import { paths } from "../utils/paths";
import { Alert, Snackbar } from "@mui/material";

export const AuthListener = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const auth = getAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (!user) {
        setOpenSnackbar(true);
        navigate(paths.HOME);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, setUser]);

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
        Użytkownik został wylogowany.
      </Alert>
    </Snackbar>
  );
};
