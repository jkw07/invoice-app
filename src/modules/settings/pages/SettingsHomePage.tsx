import { CompanySettings } from "../components/CompanySettings";
import { HorizontalMenuList } from "../components/HorizontalMenuList";
import { useState } from "react";
import { InvoicesSettings } from "../components/InvoicesSettings";
import { UserSettings } from "../components/UserSettings";
import { Paper } from "@mui/material";

export const SettingsHomePage = () => {
  const [activeComponent, setActiveComponent] = useState('company');
  const handleButtonClick = (component: string) => {
    setActiveComponent(component);
  };
  return (
    <>
        <h1>Ustawienia</h1>
      <HorizontalMenuList handleButtonClick={handleButtonClick} activeComponent={activeComponent}/>
      <Paper
      elevation={0}
      style={{
        padding: '16px',
        marginTop: "20px",
        display: 'flex',
        flexDirection: 'column',
        width: "80%"
      }}
    >
        {activeComponent === 'company' && <CompanySettings />}
        {activeComponent === 'user' && <UserSettings />}
        {activeComponent === 'invoices' && <InvoicesSettings />}
      </Paper>
    </>
  );
};
