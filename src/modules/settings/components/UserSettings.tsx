import { Box, Button, Divider } from "@mui/material";
import { UserInfo } from "./user/userInfo";

export const UserSettings = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Box sx={{ width: "300px", textAlign: "left", alignItems: "flex-start" }}>
        <h2>Ustawienia konta</h2>
        <Button
          fullWidth
          variant="outlined"
          sx={{ justifyContent: "flex-start" }}
        >
          Dane dostępowe
        </Button>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
      <Box sx={{ flex: 1, paddingLeft: 3 }}>
        <UserInfo />
      </Box>
    </Box>
  );
};
