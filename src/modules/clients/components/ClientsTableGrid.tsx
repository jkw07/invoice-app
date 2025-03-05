import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { clientsData } from '../../../tempDatabase/temporaryClientsData';
import { TextField, Box, InputAdornment, Tooltip } from "@mui/material";
import {Search} from "lucide-react";
import { useState } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridColDef} from "@mui/x-data-grid";

interface Client {
  id: number;
  name: string;
  taxId: string;
  address: string;
  email: string;
  phone: string;
  actions: React.ReactNode;
}

const clientsTableData: Client[] = clientsData.map((client) => ({
  ...client,
  actions: (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <IconButton >
        <Edit />
      </IconButton>
      <IconButton >
        <Delete />
      </IconButton>
    </div>
  ),
}));

export const columns: GridColDef[] = [
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
  {
    field: 'actions',
    headerName: 'Akcje',
    width: 130,
    renderCell: (params) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', gap: '8px' }}>
          <Tooltip title="Edytuj">
          <IconButton onClick={() => handleEdit(params.row.id)} aria-label="Edit">
            <Edit className="edit-button"/>
          </IconButton>
          </Tooltip>
          <Tooltip title="Usuń">
          <IconButton onClick={() => handleDelete(params.row.id)} aria-label="Delete">
            <Delete className="delete-button"/>
          </IconButton>
          </Tooltip>
        </div>
      );
    }
  }
];

const handleEdit = (id:number) => {
  console.log(id)
}

const handleDelete = (id: number) => {
  console.log(id)
}

export const ClientsTableGrid = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Client[]>(clientsTableData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchText(query);

    const filtered = clientsTableData.filter((client) =>
      client.name.toLowerCase().includes(query.toLowerCase()) ||
      client.taxId.toLowerCase().includes(query.toLowerCase()) ||
      client.address.toLowerCase().includes(query.toLowerCase()) ||
      client.email.toLowerCase().includes(query.toLowerCase()) ||
      client.phone.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filtered);
  };

  return (
    <>
    <TextField
        label="Szukaj"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: "100%", background: "white", marginTop: 2 }}
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
          loadingOverlay: isLoading ? {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress',
          } : undefined,
        }}
        columns={columns}
        columnHeaderHeight={56}
        slots={{
          toolbar: GridToolbar,
        }}
        localeText={{
        noRowsLabel: 'Brak wierszy',
        noResultsOverlayLabel: 'Brak wyników.',
        toolbarDensity: 'Gęstość',
        toolbarDensityLabel: 'Gęstość',
        toolbarDensityCompact: 'Kompaktowy',
        toolbarDensityStandard: 'Standardowy',
        toolbarDensityComfortable: 'Wygodny',
        toolbarColumns: 'Kolumny',
        toolbarColumnsLabel: 'Wybierz kolumny',
        toolbarFilters: 'Filtry',
        toolbarFiltersLabel: 'Pokaż filtry',
        toolbarFiltersTooltipHide: 'Ukryj filtry',
        toolbarFiltersTooltipShow: 'Pokaż filtry',
        toolbarFiltersTooltipActive: (count) =>
          count !== 1 ? `${count} aktywnych filtrów` : `${count} aktywny filtr`,
        toolbarQuickFilterPlaceholder: 'Szukaj…',
        toolbarQuickFilterLabel: 'Szukaj',
        toolbarQuickFilterDeleteIconLabel: 'Wyczyść',
        toolbarExport: 'Eksportuj',
        toolbarExportLabel: 'Eksportuj',
        toolbarExportCSV: 'Pobierz jako CSV',
        toolbarExportPrint: 'Drukuj',
        toolbarExportExcel: 'Pobierz jako Excel',
        columnsManagementSearchTitle: 'Szukaj',
        columnsManagementNoColumns: 'Brak kolumn',
        columnsManagementShowHideAllText: 'Pokaż/Ukryj wszystkie',
        columnsManagementReset: 'Resetuj',
        columnsManagementDeleteIconLabel: 'Wyczyść',
        filterPanelAddFilter: 'Dodaj filtr',
        filterPanelRemoveAll: 'Usuń wszystkie',
        filterPanelDeleteIconLabel: 'Usuń',
        filterPanelLogicOperator: 'Operator logiczny',
        filterPanelOperator: 'Operator',
        filterPanelOperatorAnd: 'I',
        filterPanelOperatorOr: 'Lub',
        filterPanelColumns: 'Kolumny',
        filterPanelInputLabel: 'Wartość',
        filterPanelInputPlaceholder: 'Wartość filtra',
        filterOperatorContains: 'zawiera',
        filterOperatorDoesNotContain: 'nie zawiera',
        filterOperatorEquals: 'równe',
        filterOperatorDoesNotEqual: 'nie równe',
        filterOperatorStartsWith: 'zaczyna się od',
        filterOperatorEndsWith: 'kończy się na',
        filterOperatorIs: 'jest',
        filterOperatorNot: 'nie jest',
        filterOperatorAfter: 'po',
        filterOperatorOnOrAfter: 'po lub w dniu',
        filterOperatorBefore: 'przed',
        filterOperatorOnOrBefore: 'przed lub w dniu',
        filterOperatorIsEmpty: 'jest puste',
        filterOperatorIsNotEmpty: 'nie jest puste',
        filterOperatorIsAnyOf: 'jest jednym z',
        headerFilterOperatorContains: 'Zawiera',
        headerFilterOperatorDoesNotContain: 'Nie zawiera',
        headerFilterOperatorEquals: 'Równe',
        headerFilterOperatorDoesNotEqual: 'Nie równe',
        headerFilterOperatorStartsWith: 'Zaczyna się od',
        headerFilterOperatorEndsWith: 'Kończy się na',
        headerFilterOperatorIs: 'Jest',
        headerFilterOperatorNot: 'Nie jest',
        headerFilterOperatorAfter: 'Po',
        headerFilterOperatorOnOrAfter: 'Po lub w dniu',
        headerFilterOperatorBefore: 'Przed',
        headerFilterOperatorOnOrBefore: 'Przed lub w dniu',
        headerFilterOperatorIsEmpty: 'Jest puste',
        headerFilterOperatorIsNotEmpty: 'Nie jest puste',
        headerFilterOperatorIsAnyOf: 'Jest jednym z',
        'headerFilterOperator=': 'Równe',
        'headerFilterOperator!=': 'Nie równe',
        'headerFilterOperator>': 'Większe niż',
        'headerFilterOperator>=': 'Większe lub równe',
        'headerFilterOperator<': 'Mniejsze niż',
        'headerFilterOperator<=': 'Mniejsze lub równe',
        filterValueAny: 'dowolne',
        filterValueTrue: 'prawda',
        filterValueFalse: 'fałsz',
        columnMenuShowColumns: 'Pokaż kolumny',
        columnMenuManageColumns: 'Zarządzaj kolumnami',
        columnMenuFilter: 'Filtr',
        columnMenuHideColumn: 'Ukryj kolumnę',
        columnMenuUnsort: 'Usuń sortowanie',
        columnMenuSortAsc: 'Sortuj rosnąco',
        columnMenuSortDesc: 'Sortuj malejąco',
        columnHeaderFiltersTooltipActive: (count) =>
          count !== 1 ? `${count} filtry` : `${count} filtr`,
        columnHeaderFiltersLabel: 'Pokaż filtry',
        columnHeaderSortIconLabel: 'Sortuj',
        footerRowSelected: (count) =>
          count !== 1
            ? `${count.toLocaleString()} wiersz`
            : `${count.toLocaleString()} wiersz`,
        footerTotalRows: 'Suma wierszy:',
        checkboxSelectionHeaderName: 'Checkbox',
        checkboxSelectionSelectAllRows: 'Zaznacz wszystkie wiersze',
        checkboxSelectionUnselectAllRows: 'Odznacz wszystkie wiersze',
        checkboxSelectionSelectRow: 'Zaznacz wiersz',
        checkboxSelectionUnselectRow: 'Odznacz wiersz',
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
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  </>
  );
}

//TODO dodać loading do tabeli


