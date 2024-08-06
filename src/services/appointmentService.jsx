import { db } from "@/firebase.init";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const appointmentsCollection = collection(db, "appointments");

export const createAppointment = async (appointment) => {
  const newAppointment = {
    ...appointment,
    createdAt: Timestamp.now(),
    status: "pending",
  };
  const docRef = await addDoc(appointmentsCollection, newAppointment);
  return docRef.id;
};
