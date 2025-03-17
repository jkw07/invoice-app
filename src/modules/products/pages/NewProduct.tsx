import { AlertColor } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addProduct } from "../../../services/productService";
import "../../../styles/buttons.scss";
import { AlertDialog } from "../../../components/AlertDialog";
import Button from "@mui/material/Button";
import { ProductForm } from "../components/ProductForm";
import { useProductsStore } from "../store/productsStore";

export const NewProduct = () => {
  const { newProductData, setNewProductData, resetNewProductData } =
    useProductsStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProductData({ ...newProductData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(newProductData);
      setAlertSeverity("success");
      setAlertMessage("Produkt został dodany pomyślnie.");
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Wystąpił błąd podczas dodawania produktu.");
      console.error("Error adding product:", error);
    } finally {
      setOpenDialog(true);
    }

    resetNewProductData();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <h2>Nowy produkt</h2>
      <NavLink to="/products" className="link-button">
        <Button>Powrót</Button>
      </NavLink>
      <ProductForm
        formData={newProductData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleReset={resetNewProductData}
        hasReset={true}
      />
      <AlertDialog
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        alertSeverity={alertSeverity}
        alertMessage={alertMessage}
      />
    </>
  );
};
