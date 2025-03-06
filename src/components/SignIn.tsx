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

export const SignIn = () => {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);
  const { goToClientsModule } = useNavigation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logowanie:", loginData);
    goToClientsModule();
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
            label="Login"
            margin="normal"
            name="login"
            variant="outlined"
            fullWidth
            autoComplete="email"
            autoFocus
            value={loginData.login}
            onChange={handleChange}
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
            value={loginData.password}
            onChange={handleChange}
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
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "baseline" }}
          >
            Przypomnij hasło
          </Link>
          <ForgotPassword open={open} handleClose={handleClose} />
          <div className="links-container">
            <Divider>Nie masz jeszcze konta?</Divider>
            <Link href="#" variant="body2">
              {"Zarejestruj się"}
            </Link>
          </div>
        </Box>
      </Box>
    </Container>
  );
};
