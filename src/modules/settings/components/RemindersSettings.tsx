import { Button, Box, Divider } from "@mui/material";
import { useState } from "react";
import { BasicSettings } from "./reminders/BasicSettings";

export const RemindersSettings = () => {
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
        <h2>Powiadomienia</h2>
        <Button
          fullWidth
          variant={activeSection === "basic" ? "outlined" : "text"}
          onClick={() => handleButtonClick("basic")}
          sx={{ justifyContent: "flex-start" }}
        >
          Ustawienia powiadomień
        </Button>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
      <Box sx={{ flex: 1, paddingLeft: 3 }}>
        {activeSection === "basic" && <BasicSettings />}
      </Box>
    </Box>
  );
};
