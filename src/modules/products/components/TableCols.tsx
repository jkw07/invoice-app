import { IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Edit, Trash2 } from "lucide-react";

export const tableColsProducts = ({
  handleDeleteProduct,
  handleGoToEditProductForm,
}: {
  handleDeleteProduct: (id: string) => void;
  handleGoToEditProductForm: (id: string) => void;
}) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Nazwa",
      width: 220,
    },
    {
      field: "unitOfMeasuer",
      headerName: "Jedn. miary",
      width: 100,
    },
    {
      field: "pkwiu",
      headerName: "PKWiU",
      width: 120,
    },
    {
      field: "cn",
      headerName: "CN",
      width: 120,
    },
    {
      field: "pkob",
      headerName: "PKOB",
      width: 120,
    },
    {
      field: "netUnitPrice",
      headerName: "Cena jedn. netto",
      width: 150,
    },
    {
      field: "vatRate",
      headerName: "Stawka VAT",
      width: 100,
    },
    {
      field: "grossUnitPrice",
      headerName: "Cena jedn. brutto",
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
                onClick={() => handleGoToEditProductForm(params.row.id)}
                aria-label="Edit"
              >
                <Edit className="edit-button" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Usuń">
              <IconButton
                onClick={() => handleDeleteProduct(params.row.id)}
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
