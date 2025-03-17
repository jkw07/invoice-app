import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const invoicesCollection = collection(db, "invoices");

export const addInvoice = async (invoice: { client: string; amount: number; date: string }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  try {
    await addDoc(invoicesCollection, {
      ...invoice,
      userId: user.uid,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network')) {
        console.error("Network error: Unable to reach the server.");
      } else {
        console.error("Error adding invoice: ", error.message);
      }
    } else {
      console.error("Unknown error adding invoice", error);
    }
  }
};

export const getInvoices = async () => {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const q = query(invoicesCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Network')) {
        console.error("Network error: Unable to reach the server.");
      } else {
        console.error("Error getting invoice: ", error.message);
      }
    } else {
      console.error("Unknown error getting invoice", error);
    }
  }
};
