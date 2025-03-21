import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { Company } from "../../types";

interface BasicInfoProps {
  handleSave: () => void;
  handleCancel: () => void;
  isLoading: boolean;
  formData: Company;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInfo = ({
  handleSave,
  handleCancel,
  isLoading,
  formData,
  handleChange,
}: BasicInfoProps) => {
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
      {isLoading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <h3>Dane podstawowe</h3>
      {!isEditing && <Button onClick={handleEdit}>Edytuj</Button>}
      {isEditing && (
        <>
          <Button onClick={handleSaveChanges}>Zapisz</Button>
          <Button onClick={handleCancelChanges}>Anuluj</Button>
        </>
      )}
      <Box>
        <TextField
          label="Nazwa firmy"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Skrót nazwy"
          name="shortName"
          value={formData.shortName}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="NIP"
          name="tin"
          value={formData.tin}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="REGON"
          name="bin"
          value={formData.bin}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
      </Box>
    </Box>
  );
};
