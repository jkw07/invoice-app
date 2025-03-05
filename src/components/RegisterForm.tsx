import { TextField } from "@mui/material";

export const RegisterForm = () => {
  return (
    <div className="login-form">
      <TextField id="login" label="login" variant="outlined" required />;
      <TextField
        id="login"
        label="login"
        variant="outlined"
        type="password"
        helperText="Hasło musi się składać z co najmniej 6 znaków, w tym dużej litery i cyfry"
        required
      />
      ;
    </div>
  );
};
