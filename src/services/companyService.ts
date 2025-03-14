import { collection, addDoc, getDocs, query, where, doc, updateDoc} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { Company } from "../modules/settings/types";

const auth = getAuth();
const companiesCollection = collection(db, "companies");

export const addCompany = async (company: { fullName: string; shortName: string; taxId: string; address: string; zipCode: string, city: string, email: string; phone: string }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  try {
    await addDoc(companiesCollection, {
      ...company,
      userId: user.uid,
    });
  } catch (error) {
    console.error("Error adding company: ", error);
  }
};

export const getCompany = async () => {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const q = query(companiesCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    fullName: data.fullName || "",
    shortName: data.shortName || "",
    taxId: data.taxId || "",
    address: data.address || "",
    zipCode: data.zipCode || "",
    city: data.city || "",
    email: data.email || "",
    phone: data.phone || "",
  };
});
  } catch (error) {
    console.error("Error getting company: ", error);
    return [];
  }
};

export const updateCompany = async (companyId: string, updatedData: Partial<Company>) => {
  try {
    const companyRef = doc(db, "companies", companyId);
    await updateDoc(companyRef, updatedData);
    console.log(`Company ${companyId} has been updated.`);
  } catch (error) {
    console.error("Error updating company:", error);
  }
};