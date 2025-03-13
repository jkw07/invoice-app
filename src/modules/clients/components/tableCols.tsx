import { IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Trash2 } from "lucide-react";

export const tableCols = ({
  handleDeleteClient,
  handleGoToEditClientForm,
}: {
  handleDeleteClient: (id: string) => void;
  handleGoToEditClientForm: (id: string) => void;
}) => {
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
                onClick={() => handleGoToEditClientForm(params.row.id)}
                aria-label="Edit"
              >
                <Edit className="edit-button" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Usuń">
              <IconButton
                onClick={() => handleDeleteClient(params.row.id)}
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
