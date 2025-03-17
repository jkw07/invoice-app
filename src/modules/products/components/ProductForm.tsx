import { Box, TextField } from "@mui/material";
import { Save, RotateCcw } from "lucide-react";
import { DefaultButton } from "../../../components/DefaultButton";

interface Product {
  id?: string;
  name: string;
  unitOfMeasuer: string;
  pkwiu: string;
  cn: string;
  pkob: string;
  netUnitPrice: number;
  vatRate: number;
  grossUnitPrice: number;
}

interface ProductFormProps {
  formData: Product;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset?: () => void;
  hasReset?: boolean;
}
export const ProductForm = ({
  formData,
  handleSubmit,
  handleChange,
  handleReset,
  hasReset = false,
}: ProductFormProps) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "50%" }}>
      <TextField
        required
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nazwa produktu"
        label="Nazwa"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />

      <TextField
        type="text"
        name="unitOfMeasuer"
        value={formData.unitOfMeasuer}
        onChange={handleChange}
        placeholder="Jednostka miary"
        label="Jednostka miary"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />
      <TextField
        type="text"
        name="pkwiu"
        value={formData.pkwiu}
        onChange={handleChange}
        placeholder="Polska Klasyfikacja Wyrobów i Usług"
        label="PKWiU"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />
      <TextField
        type="text"
        name="cn"
        value={formData.cn}
        onChange={handleChange}
        placeholder="Nomenklatura Scalona"
        label="CN"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />
      <TextField
        type="text"
        name="pkob"
        value={formData.pkob}
        onChange={handleChange}
        placeholder="Polska Klasyfikacja Obiektów Budowlanych"
        label="PKOB"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />
      <TextField
        type="number"
        name="netUnitPrice"
        value={formData.netUnitPrice}
        onChange={handleChange}
        placeholder="Cena jednostkowa netto"
        label="Cena jedn. netto"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />
      <TextField
        type="number"
        name="vatRate"
        value={formData.vatRate}
        onChange={handleChange}
        placeholder="Stawka VAT"
        label="Stawka VAT"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />
      <TextField
        type="number"
        name="grossUnitPrice"
        value={formData.grossUnitPrice}
        onChange={handleChange}
        placeholder="Cena jednostkowa brutto"
        label="Cena jedn. brutto"
        margin="normal"
        variant="outlined"
        fullWidth
        sx={{ background: "white" }}
      />
      <div
        className="buttons-container"
        style={{
          display: "flex",
          gap: 20,
          marginTop: "20px",
          justifyContent: "end",
        }}
      >
        <DefaultButton text="Zapisz" type="submit" icon={<Save />} />
        {hasReset && (
          <DefaultButton
            text="Wyczyść"
            type="reset"
            icon={<RotateCcw />}
            onClick={handleReset}
          />
        )}
      </div>
    </Box>
  );
};
