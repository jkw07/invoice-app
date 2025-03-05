import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

export const LoginForm = () => {
  return (
    <div className="login-form">
      <FormControl>
        <InputLabel htmlFor="component-outlined">Login</InputLabel>
        <OutlinedInput id="component-outlined" label="Login" />
        <InputLabel htmlFor="component-outlined">Hasło</InputLabel>
        <OutlinedInput
          id="component-outlined"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </FormControl>
    </div>
  );
};
