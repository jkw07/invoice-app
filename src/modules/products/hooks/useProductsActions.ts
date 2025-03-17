import { useNavigate } from "react-router-dom";
import { deleteProduct, updateProduct } from "../../../services/productService";
import { useProductsStore } from '../store/productsStore';
import { Product } from "../types";

export function useProductsActions() {
  const navigate = useNavigate();
  const { 
    deleteProductsData
  } = useProductsStore();

  const handleGoToEditProductForm = (id: string) => {
    navigate(`/products/edit/${id}`);
  };
  
  const handleEditProduct = (id: string, newData: Partial<Product>) => {
  updateProduct(id, newData);
};

const handleDeleteProduct = async (id: string) => {
  try {
    await deleteProduct(id); 
    deleteProductsData(id); 
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};


  return {handleEditProduct, handleDeleteProduct, handleGoToEditProductForm}
}