import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { Company } from "../../types";

interface AddressInfoProps {
  handleSave: () => void;
  handleCancel: () => void;
  formData: Company;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const AddressInfo = ({
  handleSave,
  handleCancel,
  formData,
  handleChange,
}: AddressInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    handleSave();
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    handleCancel();
    setIsEditing(false);
  };
  return (
    <Box>
      <h3>Adres</h3>
      {!isEditing && <Button onClick={handleEdit}>Edytuj</Button>}
      {isEditing && (
        <>
          <Button onClick={handleSaveChanges}>Zapisz</Button>
          <Button onClick={handleCancelChanges}>Anuluj</Button>
        </>
      )}
      <Box>
        <TextField
          label="ulica"
          name="street"
          value={formData.address.street}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Numer domu"
          name="buildingNumber"
          value={formData.address.buildingNumber}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Numer lokalu"
          name="apartmentNumber"
          value={formData.address.apartmentNumber}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Kod pocztowy"
          name="zipCode"
          value={formData.address.zipCode}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Miasto"
          name="city"
          value={formData.address.city}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Województwo"
          name="province"
          value={formData.address.province}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Powiat"
          name="county"
          value={formData.address.county}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gmina"
          name="municipality"
          value={formData.address.municipality}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
      </Box>
    </Box>
  );
};
