import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import { DeleteAccount } from "./user/DeleteAccount";
import { UserInfo } from "./user/UserInfo";

export const UserSettings = () => {
  const [activeSection, setActiveSection] = useState("basic");

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };
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
          variant={activeSection === "basic" ? "outlined" : "text"}
          onClick={() => handleButtonClick("basic")}
          sx={{ justifyContent: "flex-start" }}
        >
          Dane dostępowe
        </Button>
        <Button
          fullWidth
          variant={activeSection === "delete" ? "outlined" : "text"}
          onClick={() => handleButtonClick("delete")}
          sx={{ marginTop: 2, justifyContent: "flex-start" }}
        >
          Usuń konto
        </Button>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
      <Box sx={{ flex: 1, paddingLeft: 3 }}>
        {activeSection === "basic" && <UserInfo />}
        {activeSection === "delete" && <DeleteAccount />}
      </Box>
    </Box>
  );
};
