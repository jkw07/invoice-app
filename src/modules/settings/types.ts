 export interface Company {
    id: string;
    fullName: string;
  shortName: string;
  tin: string; 
  bin: string;
  address: {
    street: string;
    buildingNumber: string;
    apartmentNumber?: string;
    zipCode: string;
    city: string;
    province: string; 
    county: string; 
    municipality: string;
  };
  email: string;
  phone: string;
  seller: string;
  }