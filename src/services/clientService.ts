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
    console.error("Error adding client: ", error);
  }
};

export const getClients = async () => {
  const user = auth.currentUser;
  if (!user) return [];
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
    console.error("Error getting clients: ", error);
    return [];
  }
};

export const getClientById = async (clientId: string) => {
  const user = auth.currentUser;
  if (!user) return [];
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
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting client by id: ", error);
    return null;
  }
};

export const deleteClient = async (clientId: string) => {
  try {
    await deleteDoc(doc(db, "clients", clientId));
    console.log(`Client ID ${clientId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting client:", error);
  }
};

export const updateClient = async (clientId: string, updatedData: Partial<Client>) => {
  try {
    const clientRef = doc(db, "clients", clientId);
    await updateDoc(clientRef, updatedData);
    console.log(`Klient ${clientId} zaktualizowany.`);
  } catch (error) {
    console.error("Błąd podczas aktualizacji klienta:", error);
  }
};