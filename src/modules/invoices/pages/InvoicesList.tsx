import { useInvoicesNavigation } from "../hooks/useInvoicesNavigation";

export const InvoicesList = () => {
  const { goToNewInvoice } = useInvoicesNavigation();
  return (
    <>
      <h1>Lista faktur</h1>
      <button onClick={goToNewInvoice}>Dodaj nową fakturę</button>
    </>
  );
};
