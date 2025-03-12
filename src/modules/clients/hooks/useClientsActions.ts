import { deleteClient, updateClient } from "../../../services/clientService";
import { Client } from "../types";

export function useClientsActions() {
  const handleEdit = (id: string, newData: Partial<Client>) => {
  updateClient(id, newData);
};

const handleDelete = (id: string) => {
  deleteClient(id);
};
    return {handleEdit, handleDelete}
}