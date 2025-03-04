import { GridColDef } from "@mui/x-data-grid";
import { initialClients } from "./temporaryClientsData";

export const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'name',
    headerName: 'Nazwa',
    width: 220,
  },
  {
    field: 'taxId',
    headerName: 'NIP',
    width: 220,
  },
  {
    field: 'address',
    headerName: 'Adres',
    width: 300,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'phone',
    headerName: 'Telefon',
    width: 250,
  },
];
  
  export const rows = initialClients;
