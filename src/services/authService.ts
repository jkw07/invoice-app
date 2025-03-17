import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword, updateEmail, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential, deleteUser} from "firebase/auth";
import { db } from "./firebaseConfig";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useUserStore } from "../store/currentUserStore";

const auth = getAuth();

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error registering user: ", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    useUserStore.getState().setUser(user);
    return user;
  } catch (error) {
    console.error("Error logging in: ", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    useUserStore.getState().setUser(null);
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};

export const listenToAuthChanges = () => {
  onAuthStateChanged(auth, (user) => {
    useUserStore.getState().setUser(user);
  });
};

export const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
    throw error;
  }
};

export const updateUserEmail = async (newEmail: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  try {
    await updateEmail(user, newEmail);
    await setDoc(doc(db, "users", user.uid), { email: newEmail }, { merge: true });

    useUserStore.getState().setUser({ ...user, email: newEmail });
  } catch (error) {
    console.error("Error updating email: ", error);
    throw error;
  }
};


export const updateUserPassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  try {
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error("Error updating password: ", error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`E-mail do resetowania hasła wysłany na: ${email}`);
  } catch (error) {
    console.error("Błąd podczas resetowania hasła:", error);
    throw error;
  }
};

export const deleteUserAccount = async (password: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  try {
    const credential = EmailAuthProvider.credential(user.email as string, password);
    await reauthenticateWithCredential(user, credential);
    await deleteDoc(doc(db, "users", user.uid));
    await deleteUser(user);
    useUserStore.getState().setUser(null);
    console.log("User account has been deleted");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.error("Error deleting user:", error);
    }
    throw error;
  }
};
