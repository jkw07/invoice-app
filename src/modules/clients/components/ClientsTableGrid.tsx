import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { plPL } from "@mui/x-data-grid/locales";
import { TextField, Box, InputAdornment } from "@mui/material";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { TableCols } from "./tableCols";
import { useClientsTableStore } from "../store/tableStore";
import { filterData } from "../../../utils/filterData";
import { getClients } from "../../../services/clientService";
import { Client } from "../types";

const columns = TableCols();

export const ClientsTableGrid = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Client[]>([]);
  const { isLoading, startLoading, stopLoading } = useClientsTableStore();

  useEffect(() => {
    const fetchClients = async () => {
      startLoading();
      try {
        const clients = await getClients();
        setFilteredData(clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        stopLoading();
      }
    };

    fetchClients();
  }, [startLoading, stopLoading]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setSearchText(query);
    const filtered = filterData(filteredData, query);
    setFilteredData(filtered);
  }

  return (
    <>
      <TextField
        label="Szukaj"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchChange}
        sx={{
          marginBottom: 2,
          width: "100%",
          background: "white",
          marginTop: 2,
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          },
        }}
      />
      <Box sx={{ width: "100%", background: "white" }}>
        <DataGrid
          rows={filteredData}
          loading={isLoading}
          slotProps={{
            loadingOverlay: isLoading
              ? {
                  variant: "linear-progress",
                  noRowsVariant: "linear-progress",
                }
              : undefined,
          }}
          columns={columns}
          columnHeaderHeight={56}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  );
};
