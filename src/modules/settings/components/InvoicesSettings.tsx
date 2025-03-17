import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import { VatSettings } from "./invoices/VatSettings";
import { JstSettings } from "./invoices/JstSettings";
import { BasicSettings } from "./invoices/BasicSettings";


export const InvoicesSettings = () => {
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
            <h2>Ustawienia faktur</h2>
            <Button
              fullWidth
              variant={activeSection === "basic" ? "outlined" : "text"}
              onClick={() => handleButtonClick("basic")}
              sx={{ justifyContent: "flex-start" }}
            >
              Ustawienia ogólne
            </Button>
            <Button
              fullWidth
              variant={activeSection === "vat" ? "outlined" : "text"}
              onClick={() => handleButtonClick("vat")}
              sx={{ marginTop: 2, justifyContent: "flex-start" }}
            >
              Ustawienia dot. VAT
            </Button>
            <Button
              fullWidth
              variant={activeSection === "jst" ? "outlined" : "text"}
              onClick={() => handleButtonClick("contact")}
              sx={{ marginTop: 2, justifyContent: "flex-start" }}
            >
              Ustawienia dot. JST
            </Button>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
          <Box sx={{ flex: 1, paddingLeft: 3 }}>
            {activeSection === "basic" && (
              <BasicSettings/>
            )}
            {activeSection === "vat" && (
              <VatSettings/>
            )}
            {activeSection === "jst" && (
              <JstSettings/>
            )}
          </Box>
        </Box>
    </>
    )
 }