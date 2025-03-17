import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Company } from "../../types";

interface ContactInfoProps {
  handleSave: () => void;
  handleCancel: () => void;
  formData: Company;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfo = ({
  handleSave,
  handleCancel,
  formData,
  handleChange,
}: ContactInfoProps) => {
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
      <h3>Dane kontaktowe</h3>
      {!isEditing && <Button onClick={handleEdit}>Edytuj</Button>}
      {isEditing && (
        <>
          <Button onClick={handleSaveChanges}>Zapisz</Button>
          <Button onClick={handleCancelChanges}>Anuluj</Button>
        </>
      )}
      <Box>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Telefon"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
      </Box>
    </Box>
  );
};
