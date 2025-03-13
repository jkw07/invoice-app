import {create} from 'zustand';

interface Client {
  id: string;
  name: string;
  taxId: string;
  address: string;
  email: string;
  phone: string;
}

interface ClientsStore {
  clientsData: Client[];
  filteredData: Client[];
  searchText: string;
  setClientsData: (clients: Client[]) => void;
  setFilteredData: (filtered: Client[]) => void;
  setSearchText: (text: string) => void;
  deleteClientsData: (clientId: string) => void;
}

export const useClientsStore = create<ClientsStore>((set) => ({
  clientsData: [],
  filteredData: [],
  searchText: '',
  setClientsData: (clients) => set({ clientsData: clients, filteredData: clients }),
  setFilteredData: (filtered) => set({ filteredData: filtered }),
  setSearchText: (text) => set({ searchText: text }),
  deleteClientsData: (clientId) => set((state) => {
    const updatedClients = state.clientsData.filter(client => client.id !== clientId);
    return { clientsData: updatedClients, filteredData: updatedClients };
  }),
}));