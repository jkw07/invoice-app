import {create} from 'zustand';
import {Company} from "../types"


interface CompanyStore {
  companyData: Company;
  setCompanyData: (company: Company) => void;
  updateCompanyData: (company: Company) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  companyData: {
    id: "",
    fullName: "",
    shortName: "",
    tin: "",
    bin: "",
    address: {
    street: "",
    buildingNumber: "",
    apartmentNumber: "",
    zipCode: "",
    city: "",
    province: "",
    county: "", 
    municipality: "",
  },
    zipCode: "",
    city: "",
    email: "",
    phone: "",},
  setCompanyData: (company) => set({ companyData: company }),
  updateCompanyData: (company) => set((state) => ({
      companyData: { ...state.companyData, ...company },
    })),
}));