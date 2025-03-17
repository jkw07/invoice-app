import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Company } from "../../types";

interface SellerProps {
  handleSave: () => void;
  handleCancel: () => void;
  formData: Company;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Seller = ({
  handleSave,
  handleCancel,
  formData,
  handleChange,
}: SellerProps) => {
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
      <h3>Dane sprzedawcy</h3>
      {!isEditing && <Button onClick={handleEdit}>Edytuj</Button>}
      {isEditing && (
        <>
          <Button onClick={handleSaveChanges}>Zapisz</Button>
          <Button onClick={handleCancelChanges}>Anuluj</Button>
        </>
      )}
      <Box>
        <TextField
          label="Imię i nazwisko"
          name="seller"
          value={formData.seller}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
      </Box>
    </Box>
  );
};
