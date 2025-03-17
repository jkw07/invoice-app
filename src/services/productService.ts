import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc, getDoc} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { Product } from "../modules/products/types";

const auth = getAuth();
const productsCollection = collection(db, "products");

export const addProduct = async (product: { 
    name: string;
    unitOfMeasuer: string;
    pkwiu: string;
    cn: string;
    pkob: string;
    netUnitPrice: number;
    vatRate: number;
    grossUnitPrice: number; }) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  try {
    await addDoc(productsCollection, {
      ...product,
      userId: user.uid,
    });
  } catch (error) {
    console.error("Error adding product: ", error);
  }
};

export const getProducts = async () => {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const q = query(productsCollection, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name || "",
    unitOfMeasuer: data.unitOfMeasuer || "",
    pkwiu: data.pkwiu || "",
    cn: data.cn || "",
    pkob: data.pkob || "",
    netUnitPrice: data.netUnitPrice || 0,
    vatRate: data.vatRate || 0,
    grossUnitPrice: data.grossUnitPrice || 0,
  };
});
  } catch (error) {
    console.error("Error getting products: ", error);
    return [];
  }
};

export const getProductById = async (productId: string) => {
  const user = auth.currentUser;
  if (!user) return [];
  try {
    const docRef = doc(productsCollection, productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name || "",
        unitOfMeasuer: data.unitOfMeasuer || "",
        pkwiu: data.pkwiu || "",
        cn: data.cn || "",
        pkob: data.pkob || "",
        netUnitPrice: data.netUnitPrice || 0,
        vatRate: data.vatRate || 0,
        grossUnitPrice: data.grossUnitPrice || 0,
      };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting product by id: ", error);
    return null;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    console.log(`Product ID ${productId} has been deleted.`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export const updateProduct = async (productId: string, updatedData: Partial<Product>) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
    console.log(`Product ${productId} has beed updated.`);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};