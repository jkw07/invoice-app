import { create } from "zustand";

type ClientsTableState = {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export const useClientsTableStore = create<ClientsTableState>((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));


