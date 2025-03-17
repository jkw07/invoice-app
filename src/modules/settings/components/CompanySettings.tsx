import {
  Button,
  Box,
  Divider,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { BasicInfo } from "./company/BasicInfo";
import { AddressInfo } from "./company/AddressInfo";
import {
  addCompany,
  getCompany,
  updateCompany,
} from "../../../services/companyService";
import { useCompanyStore } from "../store/companyStore";
import { ContactInfo } from "./company/ContactInfo";

export const CompanySettings = () => {
  const [activeSection, setActiveSection] = useState("basic");
  const { companyData, setCompanyData, updateCompanyData } = useCompanyStore();
  const [formData, setFormData] = useState(companyData);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      if (companyData.id !== "") return;
      setIsLoading(true);
      try {
        const companies = await getCompany();

        if (companies.length > 0) {
          setCompanyData(companies[0]);
        } else {
          setAlertOpen(true);
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [setCompanyData, companyData.id]);

  useEffect(() => {
    setFormData(companyData);
  }, [companyData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      [
        "street",
        "buildingNumber",
        "apartmentNumber",
        "zipCode",
        "city",
        "province",
        "county",
        "municipality",
      ].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (companyData.id) {
      await updateCompany(companyData.id, formData);
      updateCompanyData(formData);
    }
  };

  const handleAlertSave = async () => {
    const newCompany = {
      id: formData.fullName,
      fullName: formData.fullName,
      shortName: formData.shortName,
      tin: formData.tin,
      bin: formData.bin,
      address: {
        street: formData.address.street,
        buildingNumber: formData.address.buildingNumber,
        apartmentNumber: formData.address.apartmentNumber,
        zipCode: formData.address.zipCode,
        city: formData.address.city,
        province: formData.address.province,
        county: formData.address.county,
        municipality: formData.address.municipality,
      },
      email: formData.email,
      phone: formData.phone,
    };
    await addCompany(newCompany);
    setCompanyData(newCompany);
    setAlertOpen(false);
  };

  const handleCancel = () => {
    setFormData(companyData);
  };

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Box
          sx={{ width: "300px", textAlign: "left", alignItems: "flex-start" }}
        >
          <h2>Dane Twojej Firmy</h2>
          <Button
            fullWidth
            variant={activeSection === "basic" ? "outlined" : "text"}
            onClick={() => handleButtonClick("basic")}
            sx={{ justifyContent: "flex-start" }}
          >
            Dane podstawowe
          </Button>
          <Button
            fullWidth
            variant={activeSection === "address" ? "outlined" : "text"}
            onClick={() => handleButtonClick("address")}
            sx={{ marginTop: 2, justifyContent: "flex-start" }}
          >
            Adres
          </Button>
          <Button
            fullWidth
            variant={activeSection === "contact" ? "outlined" : "text"}
            onClick={() => handleButtonClick("contact")}
            sx={{ marginTop: 2, justifyContent: "flex-start" }}
          >
            Dane kontaktowe
          </Button>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
        <Box sx={{ flex: 1, paddingLeft: 3 }}>
          {activeSection === "basic" && (
            <BasicInfo
              handleSave={handleSave}
              handleCancel={handleCancel}
              isLoading={isLoading}
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {activeSection === "address" && (
            <AddressInfo
              handleSave={handleSave}
              handleCancel={handleCancel}
              formData={formData}
              handleChange={handleChange}
            />
          )}
          {activeSection === "contact" && (
            <ContactInfo
              handleSave={handleSave}
              handleCancel={handleCancel}
              formData={formData}
              handleChange={handleChange}
            />
          )}
        </Box>
      </Box>
      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <DialogTitle>Uzupełnij dane firmy</DialogTitle>
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
            name="tin"
            value={formData.tin}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="REGON"
            name="bin"
            value={formData.bin}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="ulica"
            name="street"
            value={formData.address.street}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Numer domu"
            name="buildingNumber"
            value={formData.address.buildingNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Numer lokalu"
            name="apartmentNumber"
            value={formData.address.apartmentNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Kod pocztowy"
            name="zipCode"
            value={formData.address.zipCode}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Miasto"
            name="city"
            value={formData.address.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Województwo"
            name="province"
            value={formData.address.province}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Powiat"
            name="county"
            value={formData.address.county}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gmina"
            name="municipality"
            value={formData.address.municipality}
            onChange={handleChange}
            fullWidth
            margin="normal"
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
    </>
  );
};
