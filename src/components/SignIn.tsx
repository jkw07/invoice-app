import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Container,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigation } from "../hooks/useNavigation";
import logo from "../../public/assets/logo/logo1mini.png";
import { ForgotPassword } from "./ForgotPassword";
import { SignUp } from "./SignUp";
import { loginUser } from "../services/authService";

export const SignIn = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginAlert, setLoginAlert] = useState<string | null>(null);
  const { goToInvoicesModule } = useNavigation();

  const handleOpenPasswordReminder = () => {
    setForgotPasswordDialogOpen(true);
  };

  const handleClosePasswordReminder = () => {
    setForgotPasswordDialogOpen(false);
  };

  const handleOpenSignUp = () => {
    setSignUpOpen(true);
  };

  const handleCloseSignUp = () => {
    setSignUpOpen(false);
  };

  const togglePasswordVisibility = () => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setLoginAlert(null);
    try {
      await loginUser(state.email, state.password);
      goToInvoicesModule();
    } catch (error) {
      console.error("Login failed: ", error);
      setLoginAlert("Błąd logowania. Spróbuj ponownie.");
      setState({
        email: "",
        password: "",
        showPassword: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="main-logo">
          <img src={logo} alt="logo"></img>
        </div>
        <h2>Logowanie do programu Faktury</h2>
        {loginAlert !== null && <Alert severity="error">{loginAlert}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            required
            label="Email"
            margin="normal"
            name="email"
            variant="outlined"
            fullWidth
            autoComplete="email"
            type="email"
            autoFocus
            value={state.email}
            onChange={handleChange}
          />

          <TextField
            label="Hasło"
            margin="normal"
            name="password"
            type={state.showPassword ? "text" : "password"}
            variant="outlined"
            autoComplete="current-password"
            required
            fullWidth
            value={state.password}
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Zapamiętaj"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Logowanie..." : "Zaloguj"}
          </Button>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Link
            component="button"
            type="button"
            onClick={handleOpenPasswordReminder}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Przypomnij hasło
          </Link>
          <ForgotPassword
            open={forgotPasswordDialogOpen}
            handleClose={handleClosePasswordReminder}
          />
          <div className="links-container">
            <Divider>Nie masz jeszcze konta?</Divider>
            <Link
              component="button"
              type="button"
              onClick={handleOpenSignUp}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Zarejestruj się
            </Link>
            <SignUp open={signUpOpen} handleClose={handleCloseSignUp} />
          </div>
        </Box>
      </Box>
    </Container>
  );
};
