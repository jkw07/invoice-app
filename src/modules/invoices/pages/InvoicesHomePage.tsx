import { Routes, Route, Navigate } from "react-router-dom";
import { InvoicesList } from "./InvoicesList";
import { NewInvoice } from "./NewInvoice";

export const InvoicesHomePage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<InvoicesList />} />
        <Route path="/new" element={<NewInvoice />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
