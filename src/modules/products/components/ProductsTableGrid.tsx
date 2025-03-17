import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { plPL } from "@mui/x-data-grid/locales";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { filterData } from "../../../utils/filterData";
import { getProducts } from "../../../services/productService";
import { useProductsStore } from "../store/productsStore";
import { useProductsActions } from "../hooks/useProductsActions";
import { tableColsProducts } from "./TableCols";

export const ProductsTableGrid = () => {
  const { handleDeleteProduct, handleGoToEditProductForm } =
    useProductsActions();
  const columns = tableColsProducts({
    handleDeleteProduct,
    handleGoToEditProductForm,
  });
  const {
    productsData,
    filteredData,
    searchText,
    setFilteredData,
    setProductsData,
  } = useProductsStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getProducts();
        setProductsData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [setProductsData]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredData(productsData);
    } else {
      const filtered = filterData(productsData, searchText);
      setFilteredData(filtered);
    }
  }, [searchText, productsData, setFilteredData]);

  return (
    <>
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
