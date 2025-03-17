import { AlertColor, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/buttons.scss";
import { AlertDialog } from "../../../components/AlertDialog";
import Button from "@mui/material/Button";
import { Product } from "../types";
import { ProductForm } from "../components/ProductForm";
import {
  getProductById,
  updateProduct,
} from "../../../services/productService";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const { id: productId } = useParams();
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    unitOfMeasuer: "",
    pkwiu: "",
    cn: "",
    pkob: "",
    netUnitPrice: 0,
    vatRate: 0,
    grossUnitPrice: 0,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor | undefined>(
    undefined
  );
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!productId) return;
    const fetchProductData = async () => {
      setIsLoading(true);
      setOpenDialog(false);
      try {
        const data = await getProductById(productId);
        if (data && !Array.isArray(data)) {
          setFormData(data as Product);
        } else {
          setOpenDialog(true);
          setAlertSeverity("error");
          setAlertMessage("Nie znaleziono produktu.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setOpenDialog(true);
        setAlertSeverity("error");
        setAlertMessage("Wystąpił błąd podczas pobierania danych.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (productId) {
        await updateProduct(productId, formData);
      } else {
        setAlertSeverity("error");
        setAlertMessage("Nieprawidłowy identyfikator produktu.");
        setOpenDialog(true);
      }
      setAlertSeverity("success");
      setAlertMessage("Dane zostały zaktualizowane pomyślnie.");
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Wystąpił błąd podczas aktualizacji danych.");
      console.log(error);
    } finally {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <h2>Edytuj produkt</h2>
      <NavLink to="/products" className="link-button">
        <Button>Powrót</Button>
      </NavLink>
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <ProductForm
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
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
