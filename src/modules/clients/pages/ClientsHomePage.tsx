import { Routes, Route, Navigate } from "react-router-dom";
import { NewClient } from "./NewClient";
import { ClientsList } from "./ClientsList";
import { EditClient } from "./EditClient";

export const ClientsHomePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientsList />} />
        <Route path="new" element={<NewClient />} />
        <Route path="edit/:id" element={<EditClient />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};
