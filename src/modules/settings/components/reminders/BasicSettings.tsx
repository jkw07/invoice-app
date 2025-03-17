import { Button, Box} from "@mui/material";
import { useState } from "react";

export const BasicSettings = () => {
   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState();
  
    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSaveChanges = async () => {
      setIsEditing(false);
    };
   
    const handleCancelChanges = () => {
      setIsEditing(false);
    };
  return (
    <>
      <h3>Powiadomienia w aplikacji</h3>
      {!isEditing && <Button onClick={handleEdit}>Edytuj</Button>}
      {isEditing && (
        <>
          <Button onClick={handleSaveChanges}>Zapisz</Button>
          <Button onClick={handleCancelChanges}>Anuluj</Button>
        </>
      )}
      <Box>
      </Box>
    </>
  );
};
