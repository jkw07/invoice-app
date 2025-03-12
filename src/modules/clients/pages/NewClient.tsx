import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { addClient } from "../../../services/clientService";
import { StepBack } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Save } from "lucide-react";
import "../../../styles/buttons.scss";
import { DefaultButton } from "../../../components/DefaultButton";

interface NewClient {
  name: string;
  taxId: string;
  address: string;
  email: string;
  phone: string;
}

export const NewClient = () => {
  const [formData, setFormData] = useState<NewClient>({
    name: "",
    taxId: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleReset = () => {
    setFormData({ name: "", taxId: "", address: "", email: "", phone: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addClient(formData);
    setFormData({ name: "", taxId: "", address: "", email: "", phone: "" });
  };
  return (
    <>
      <h2>Nowy Klient</h2>
      <NavLink to="/clients" className="link-button">
        <DefaultButton text="Powrót" type="return" icon={<StepBack />} />
      </NavLink>
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
          placeholder="Nazwa"
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
          <DefaultButton
            text="Wyczyść"
            type="reset"
            icon={<RotateCcw />}
            onClick={handleReset}
          />
        </div>
      </Box>
    </>
  );
};
