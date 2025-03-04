import { ClientsTable } from '../components/ClientsTable';



export const ClientsList = () => {
  return (
    <>
    <div className="client-table-header">
      <h2>Lista Klientów</h2>
    </div>
    <ClientsTable/>
    </>
  );
};
