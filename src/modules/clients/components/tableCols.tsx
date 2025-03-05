import { IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Trash2 } from "lucide-react";
import { useClientsActions } from "../hooks/useClientsActions";

export const TableCols = () => {
  const { handleDelete, handleEdit } = useClientsActions();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Nazwa",
      width: 200,
    },
    {
      field: "taxId",
      headerName: "NIP",
      width: 150,
    },
    {
      field: "address",
      headerName: "Adres",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Telefon",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Akcje",
      width: 130,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              gap: "8px",
            }}
          >
            <Tooltip title="Edytuj">
              <IconButton
                onClick={() => handleEdit(params.row.id)}
                aria-label="Edit"
              >
                <Edit className="edit-button" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Usuń">
              <IconButton
                onClick={() => handleDelete(params.row.id)}
                aria-label="Delete"
              >
                <Trash2 className="delete-button" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return columns;
};
