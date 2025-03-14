import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  addCompany,
  getCompany,
  updateCompany,
} from "../../../../services/companyService";
import { useEffect, useState } from "react";
import { useCompanyStore } from "../../store/companyStore";

export const BasicInfo = () => {
  const { companyData, setCompanyData, updateCompanyData } = useCompanyStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(companyData);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      const companies = await getCompany();
      if (companies.length > 0) {
        setCompanyData(companies[0]);
      } else {
        setAlertOpen(true);
      }
    };

    fetchCompany();
  }, [setCompanyData]);

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

  const handleAlertSave = async () => {
    const newCompany = {
      id: formData.fullName,
      fullName: formData.fullName,
      shortName: formData.shortName,
      taxId: formData.taxId,
      address: formData.address,
      zipCode: formData.zipCode,
      city: formData.city,
      email: formData.email,
      phone: formData.phone,
    };
    await addCompany(newCompany);
    setCompanyData(newCompany);
    setAlertOpen(false);
  };

  const handleCancel = () => {
    setFormData(companyData);
    setIsEditing(false);
  };

  return (
    <Box>
      <h3>Podstawowe dane</h3>
      {!isEditing && <Button onClick={handleEdit}>Edytuj</Button>}
      {isEditing && (
        <>
          <Button onClick={handleSave}>Zapisz</Button>
          <Button onClick={handleCancel}>Anuluj</Button>
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
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
          disabled={!isEditing}
          fullWidth
          margin="normal"
        />
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

      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogTitle>Brak danych firmy</DialogTitle>
        <DialogContent>
          <TextField
            label="Nazwa firmy"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Skrót nazwy"
            name="shortName"
            value={formData.shortName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="NIP"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Adres"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Kod pocztowy"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Miasto"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Telefon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertSave}>Zapisz</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
