import { Button, TextField, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { updateCompany } from "../../../../services/companyService";
import { useCompanyStore } from "../../store/companyStore";

export const AddressInfo = () => {
  const { companyData, updateCompanyData } = useCompanyStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(companyData);

  useEffect(() => {
    setFormData(companyData);
  }, [companyData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (companyData.id) {
      await updateCompany(companyData.id, formData);
      updateCompanyData(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(companyData);
    setIsEditing(false);
  };

  return (
    <Box>
      <h3>Adres</h3>
      {!isEditing && <Button onClick={handleEdit}>Edytuj</Button>}
      {isEditing && (
        <>
          <Button onClick={handleSave}>Zapisz</Button>
          <Button onClick={handleCancel}>Anuluj</Button>
        </>
      )}
      <Box>
        <TextField
          label="Adres"
          name="address"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Kod pocztowy"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Miasto"
          name="city"
          value={formData.city}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
      </Box>
    </Box>
  );
};
