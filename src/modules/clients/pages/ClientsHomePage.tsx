import { Routes, Route, Navigate } from "react-router-dom";
import { NewClient } from "./NewClient";
import { ClientsList } from "./ClientsList";

export const ClientsHomePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="/new" element={<NewClient />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
