import { db } from "@/firebase.init";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

// Reference to the 'users' collection in Firestore
const usersCollection = collection(db, "users");

// Function to retrieve users
export const getUsers = async () => {
  // Get a reference to the users
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// / Function to create a new user
export const createUser = async (user) => {
  const userDoc = doc(usersCollection, user.id);
  await setDoc(userDoc, user);
};
