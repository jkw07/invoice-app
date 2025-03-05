import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigation } from "../hooks/useNavigation";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { goToClientsModule } = useNavigation();

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
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 300,
          mx: "auto",
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h5" align="center">
          Logowanie
        </Typography>

        <TextField
          required
          label="Login"
          name="login"
          variant="outlined"
          fullWidth
          value={loginData.login}
          onChange={handleChange}
        />

        <TextField
          label="Hasło"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
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

        <Button type="submit" variant="contained" color="primary">
          Zaloguj się
        </Button>
      </Box>
    </>
  );
};
