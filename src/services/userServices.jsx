import { db } from "@/firebase.init";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

export const getUsers = async (currentUserId) => {
  const q = query(usersCollection, where("id", "!=", currentUserId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createUser = async (user) => {
  const userDoc = doc(usersCollection, user.id);
  await setDoc(userDoc, user);
};
