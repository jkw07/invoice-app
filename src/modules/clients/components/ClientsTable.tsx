import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { columns, rows } from "../helpers/tableGrid";

export const ClientsTable = () => {
  return (
    <Box sx={{ width: "90%", background: "white" }}>
      <DataGrid
        rows={rows}
        //loading dodać isLoading??loading
        columns={columns}
        columnHeaderHeight={56}
        slots={{
          toolbar: GridToolbar,
        }}
        localeText={{
          noRowsLabel: "Brak wierszy",
          noResultsOverlayLabel: "Brak wyników.",
          toolbarDensity: "Gęstość",
          toolbarDensityLabel: "Gęstość",
          toolbarDensityCompact: "Kompaktowy",
          toolbarDensityStandard: "Standardowy",
          toolbarDensityComfortable: "Wygodny",
          toolbarColumns: "Kolumny",
          toolbarColumnsLabel: "Wybierz kolumny",
          toolbarFilters: "Filtry",
          toolbarFiltersLabel: "Pokaż filtry",
          toolbarFiltersTooltipHide: "Ukryj filtry",
          toolbarFiltersTooltipShow: "Pokaż filtry",
          toolbarFiltersTooltipActive: (count) =>
            count !== 1
              ? `${count} aktywnych filtrów`
              : `${count} aktywny filtr`,
          toolbarQuickFilterPlaceholder: "Szukaj…",
          toolbarQuickFilterLabel: "Szukaj",
          toolbarQuickFilterDeleteIconLabel: "Wyczyść",
          toolbarExport: "Eksportuj",
          toolbarExportLabel: "Eksportuj",
          toolbarExportCSV: "Pobierz jako CSV",
          toolbarExportPrint: "Drukuj",
          toolbarExportExcel: "Pobierz jako Excel",
          columnsManagementSearchTitle: "Szukaj",
          columnsManagementNoColumns: "Brak kolumn",
          columnsManagementShowHideAllText: "Pokaż/Ukryj wszystkie",
          columnsManagementReset: "Resetuj",
          columnsManagementDeleteIconLabel: "Wyczyść",
          filterPanelAddFilter: "Dodaj filtr",
          filterPanelRemoveAll: "Usuń wszystkie",
          filterPanelDeleteIconLabel: "Usuń",
          filterPanelLogicOperator: "Operator logiczny",
          filterPanelOperator: "Operator",
          filterPanelOperatorAnd: "I",
          filterPanelOperatorOr: "Lub",
          filterPanelColumns: "Kolumny",
          filterPanelInputLabel: "Wartość",
          filterPanelInputPlaceholder: "Wartość filtra",
          filterOperatorContains: "zawiera",
          filterOperatorDoesNotContain: "nie zawiera",
          filterOperatorEquals: "równe",
          filterOperatorDoesNotEqual: "nie równe",
          filterOperatorStartsWith: "zaczyna się od",
          filterOperatorEndsWith: "kończy się na",
          filterOperatorIs: "jest",
          filterOperatorNot: "nie jest",
          filterOperatorAfter: "po",
          filterOperatorOnOrAfter: "po lub w dniu",
          filterOperatorBefore: "przed",
          filterOperatorOnOrBefore: "przed lub w dniu",
          filterOperatorIsEmpty: "jest puste",
          filterOperatorIsNotEmpty: "nie jest puste",
          filterOperatorIsAnyOf: "jest jednym z",
          headerFilterOperatorContains: "Zawiera",
          headerFilterOperatorDoesNotContain: "Nie zawiera",
          headerFilterOperatorEquals: "Równe",
          headerFilterOperatorDoesNotEqual: "Nie równe",
          headerFilterOperatorStartsWith: "Zaczyna się od",
          headerFilterOperatorEndsWith: "Kończy się na",
          headerFilterOperatorIs: "Jest",
          headerFilterOperatorNot: "Nie jest",
          headerFilterOperatorAfter: "Po",
          headerFilterOperatorOnOrAfter: "Po lub w dniu",
          headerFilterOperatorBefore: "Przed",
          headerFilterOperatorOnOrBefore: "Przed lub w dniu",
          headerFilterOperatorIsEmpty: "Jest puste",
          headerFilterOperatorIsNotEmpty: "Nie jest puste",
          headerFilterOperatorIsAnyOf: "Jest jednym z",
          "headerFilterOperator=": "Równe",
          "headerFilterOperator!=": "Nie równe",
          "headerFilterOperator>": "Większe niż",
          "headerFilterOperator>=": "Większe lub równe",
          "headerFilterOperator<": "Mniejsze niż",
          "headerFilterOperator<=": "Mniejsze lub równe",
          filterValueAny: "dowolne",
          filterValueTrue: "prawda",
          filterValueFalse: "fałsz",
          columnMenuShowColumns: "Pokaż kolumny",
          columnMenuManageColumns: "Zarządzaj kolumnami",
          columnMenuFilter: "Filtr",
          columnMenuHideColumn: "Ukryj kolumnę",
          columnMenuUnsort: "Usuń sortowanie",
          columnMenuSortAsc: "Sortuj rosnąco",
          columnMenuSortDesc: "Sortuj malejąco",
          columnHeaderFiltersTooltipActive: (count) =>
            count !== 1 ? `${count} filtry` : `${count} filtr`,
          columnHeaderFiltersLabel: "Pokaż filtry",
          columnHeaderSortIconLabel: "Sortuj",
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} wierszy`
              : `${count.toLocaleString()} wiersz`,
          footerTotalRows: "Suma wierszy:",
          checkboxSelectionHeaderName: "Checkbox",
          checkboxSelectionSelectAllRows: "Zaznacz wszystkie wiersze",
          checkboxSelectionUnselectAllRows: "Odznacz wszystkie wiersze",
          checkboxSelectionSelectRow: "Zaznacz wiersz",
          checkboxSelectionUnselectRow: "Odznacz wiersz",
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
  );
};
