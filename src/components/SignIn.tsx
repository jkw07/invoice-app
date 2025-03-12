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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigation } from "../hooks/useNavigation";
import logo from "../../public/assets/logo/logo1mini.png";
import { ForgotPassword } from "./ForgotPassword";
import { SignUp } from "./SignUp";
import { loginUser } from "../services/authService";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordDialogOpen, setForgotPasswordDialogOpen] =
    useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
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
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      goToInvoicesModule();
    } catch (error) {
      console.error("Login failed: ", error);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Hasło"
            margin="normal"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            autoComplete="current-password"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
            Zaloguj
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
