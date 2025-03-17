import {create} from 'zustand';
import {Product} from "../types"

interface ProductsStore {
  newProductData: Product;
  productsData: Product[];
  filteredData: Product[];
  searchText: string;
  setProductsData: (products: Product[]) => void;
  setFilteredData: (filtered: Product[]) => void;
  setSearchText: (text: string) => void;
  deleteProductsData: (productId: string) => void;
  setNewProductData: (product: Product) => void;
  resetNewProductData: () => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  newProductData: {
    id: "",
    name: "",
    unitOfMeasuer: "",
    pkwiu: "",
    cn: "",
    pkob: "",
    netUnitPrice: 0,
    vatRate: 0,
    grossUnitPrice: 0,
  },
  productsData: [],
  filteredData: [],
  searchText: '',
  setProductsData: (products) => set({ productsData: products, filteredData: products }),
  setFilteredData: (filtered) => set({ filteredData: filtered }),
  setSearchText: (text) => set({ searchText: text }),
  deleteProductsData: (productId) => set((state) => {
    const updatedProducts = state.productsData.filter(product => product.id !== productId);
    return { productsData: updatedProducts, filteredData: updatedProducts };
  }),
  setNewProductData: (product) => set((state) => ({
      newProductData: { ...state.newProductData, ...product },
    })),
  resetNewProductData: () => set({newProductData: {
   id: "",
    name: "",
    unitOfMeasuer: "",
    pkwiu: "",
    cn: "",
    pkob: "",
    netUnitPrice: 0,
    vatRate: 0,
    grossUnitPrice: 0,
  }}),
}));