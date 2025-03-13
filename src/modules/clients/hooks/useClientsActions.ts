import { useNavigate } from "react-router-dom";
import { deleteClient, updateClient } from "../../../services/clientService";
import { useClientsStore } from '../store/clientsStore';
import { Client } from "../types";

export function useClientsActions() {
  const navigate = useNavigate();
  const { 
    deleteClientsData
  } = useClientsStore();

  const handleGoToEditClientForm = (id: string) => {
    navigate(`/clients/edit/${id}`);
  };
  
  const handleEditClient = (id: string, newData: Partial<Client>) => {
  updateClient(id, newData);
};

const handleDeleteClient = async (id: string) => {
  try {
    await deleteClient(id); 
    deleteClientsData(id); 
  } catch (error) {
    console.error('Błąd przy usuwaniu klienta:', error);
  }
};


    return {handleEditClient, handleDeleteClient, handleGoToEditClientForm}
}