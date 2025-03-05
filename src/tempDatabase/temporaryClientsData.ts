export const clientsData: Client[] = [
    { id: 1, name: 'Jan Kowalski', taxId: '123-456-78-90', address: '00-000 Warszawa, ul. Polska 1', email: 'jan@example.com', phone: '123456789' },
    { id: 2, name: 'Anna Nowak', taxId: '987-654-32-10', address: '11-111 Kraków, ul. Polska 2', email: 'anna@example.com', phone: '987654321' },
    { id: 3, name: 'Tomasz Zieliński', taxId: '555-555-55-55', address: '44-444 Gdańsk, ul. Polska 3', email: 'tomasz@example.com', phone: '555555555' },
    { id: 4, name: 'Jan Kowalski', taxId: '123-456-78-90', address: '32-258 Warszawa, ul. Polska 1', email: 'jan@example.com', phone: '123456789' },
    { id: 5, name: 'Anna Nowak', taxId: '987-654-32-10', address: '32-258 Kraków, ul. Polska 2', email: 'anna@example.com', phone: '987654321' },
    { id: 6, name: 'Tomasz Zieliński', taxId: '555-555-55-55', address: '55-555 Gdańsk, ul. Polska 3', email: 'tomasz@example.com', phone: '555555555' },
    { id: 7, name: 'Jan Kowalski', taxId: '123-456-78-90', address: '65-555 Warszawa, ul. Polska 1', email: 'jan@example.com', phone: '123456789' },
    { id: 8, name: 'Anna Nowak', taxId: '987-654-32-10', address: '89-888 Kraków, ul. Polska 2', email: 'anna@example.com', phone: '987654321' },
    { id: 9, name: 'Tomasz Zieliński', taxId: '555-555-55-55', address: '65-555 Gdańsk, ul. Polska 3', email: 'tomasz@example.com', phone: '555555555' },
    { id: 10, name: 'Jan Kowalski', taxId: '123-456-78-90', address: '65-555 Warszawa, ul. Polska 1', email: 'jan@example.com', phone: '123456789' },
    { id: 11, name: 'Anna Nowak', taxId: '987-654-32-10', address: '12-123 Kraków, ul. Polska 2', email: 'anna@example.com', phone: '987654321' },
    { id: 12, name: 'Tomasz Zieliński', taxId: '555-555-55-55', address: '33-258 Gdańsk, ul. Polska 3', email: 'tomasz@example.com', phone: '555555555' }
  ];

  export interface Client {
    id: number;
    name: string;
    taxId: string;
    address: string;
    email: string;
    phone: string;
  }