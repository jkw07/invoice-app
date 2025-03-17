import { DefaultButton } from "../../../components/DefaultButton";
import { ProductsTableGrid } from "../components/ProductsTableGrid";
import "../../../styles/clientsList.scss";
import { NavLink } from "react-router-dom";
import { SearchInput } from "../components/SearchInput";

export const ProductsList = () => {
  return (
    <>
      <h1>Lista produktów</h1>
      <div className="clients-actions-container">
        <NavLink to="/products/new" className="link-button">
          <DefaultButton text="Dodaj produkt" />
        </NavLink>
      </div>
      <div className="clients-table-container">
        <SearchInput />
        <ProductsTableGrid />
      </div>
    </>
  );
};
