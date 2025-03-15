import { Button, Box, Divider } from "@mui/material";
import { useState } from "react";
import { BasicInfo } from "./company/BasicInfo";
import { AddressInfo } from "./company/AddressInfo";

export const CompanySettings = () => {
  const [activeSection, setActiveSection] = useState("basic");

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Box
          sx={{ width: "300px", textAlign: "left", alignItems: "flex-start" }}
        >
          <h2>Dane Twojej Firmy</h2>
          <Button
            fullWidth
            variant={activeSection === "basic" ? "outlined" : "text"}
            onClick={() => handleButtonClick("basic")}
            sx={{ justifyContent: "flex-start" }}
          >
            Dane podstawowe
          </Button>
          <Button
            fullWidth
            variant={activeSection === "address" ? "outlined" : "text"}
            onClick={() => handleButtonClick("address")}
            sx={{ marginTop: 2, justifyContent: "flex-start" }}
          >
            Adres
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
        <Box sx={{ flex: 1, paddingLeft: 3 }}>
          {activeSection === "basic" && <BasicInfo />}
          {activeSection === "address" && <AddressInfo />}
        </Box>
      </Box>
    </>
  );
};
