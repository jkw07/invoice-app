import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc, getDoc} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { Client } from "../modules/clients/types";

const auth = getAuth();
const clientsCollection = collection(db, "clients");

export const addClient = async (client: { name: string; taxId: string; address: string; email: string; phone: string }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  try {
    await addDoc(clientsCollection, {
      ...client,
      email: String(client.email),
      userId: user.uid,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network')) {
        console.error("Network error: Unable to reach the server.");
      } else {
        console.error("Error adding client: ", error.message);
      }
    } else {
      console.error("Unknown error adding client", error);
    }
  }
};

export const getClients = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return [];
  }
  try {
    const q = query(clientsCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name || "",
    taxId: data.taxId || "",
    address: data.address || "",
    email: data.email || "",
    phone: data.phone || "",
  };
});
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network')) {
        console.error("Network error: Unable to fetch clients.");
      } else {
        console.error("Error getting clients: ", error.message);
      }
    } else {
      console.error("Unknown error getting clients", error);
    }
    return [];
  }
};

export const getClientById = async (clientId: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not logged in");
    return [];
  }
  try {
    const docRef = doc(clientsCollection, clientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || "",
        taxId: data.taxId || "",
        address: data.address || "",
        email: data.email || "",
        phone: data.phone || "",
      };
    } else {
      console.error("Client not found with the provided ID");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network')) {
        console.error("Network error: Unable to fetch client details.");
      } else {
        console.error("Error getting client by id: ", error.message);
      }
    } else {
      console.error("Unknown error getting client by id", error);
    }
    return null;
  }
};

export const deleteClient = async (clientId: string) => {
  try {
    await deleteDoc(doc(db, "clients", clientId));
    console.log(`Client ID ${clientId} has been deleted.`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network')) {
        console.error("Network error: Unable to delete client.");
      } else {
        console.error("Error deleting client:", error.message);
      }
    } else {
      console.error("Unknown error deleting client", error);
    }
  }
};

export const updateClient = async (clientId: string, updatedData: Partial<Client>) => {
  try {
    const clientRef = doc(db, "clients", clientId);
    await updateDoc(clientRef, updatedData);
    console.log(`Client ${clientId} has been updated.`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network')) {
        console.error("Network error: Unable to update client.");
      } else {
        console.error("Error updating client:", error.message);
      }
    } else {
      console.error("Unknown error updating client", error);
    }
  }
};