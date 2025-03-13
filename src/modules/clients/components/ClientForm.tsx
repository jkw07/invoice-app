import { Box, TextField } from "@mui/material";
import { Save, RotateCcw } from "lucide-react"
import { DefaultButton } from "../../../components/DefaultButton"

interface Client {
    id?: string;
    name: string;
    taxId: string;
    address: string;
    email: string;
    phone: string;
  }

  interface ClientFormProps {
    formData: Client;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleReset?: () => void;
    hasReset?: boolean;
  }
export const ClientForm = ({formData, handleSubmit, handleChange, handleReset, hasReset = false}: ClientFormProps) => {
    return (
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "50%" }}
      >
        <TextField
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nazwa firmy lub imię i nazwisko klienta"
          label="Nazwa"
          margin="normal"
          variant="outlined"
          fullWidth
          sx={{ background: "white" }}
        />

        <TextField
          type="text"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
          placeholder="NIP"
          label="NIP"
          margin="normal"
          variant="outlined"
          fullWidth
          sx={{ background: "white" }}
        />
        <TextField
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Adres"
          label="Adres"
          margin="normal"
          variant="outlined"
          fullWidth
          sx={{ background: "white" }}
        />
        <TextField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          label="Email"
          margin="normal"
          variant="outlined"
          fullWidth
          sx={{ background: "white" }}
        />
        <TextField
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Telefon"
          label="Telefon"
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
          {hasReset && <DefaultButton
            text="Wyczyść"
            type="reset"
            icon={<RotateCcw />}
            onClick={handleReset}
          />}
        </div>
      </Box>
  );
};