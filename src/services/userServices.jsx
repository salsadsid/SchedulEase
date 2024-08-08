import { db } from "@/firebase.init";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const usersCollection = collection(db, "users");

export const getUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createUser = async (user) => {
  const userDoc = doc(usersCollection, user.id);
  await setDoc(userDoc, user);
};
