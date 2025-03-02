import { useInvoicesNavigation } from "../hooks/useInvoicesNavigation";

export const InvoicesList = () => {
  const { goToNewInvoice } = useInvoicesNavigation();
  return (
    <>
      <h2>Lista faktur</h2>
      <button onClick={goToNewInvoice}>Dodaj nową fakturę</button>
    </>
  );
};
