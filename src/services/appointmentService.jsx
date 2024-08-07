import { db, storage } from "@/firebase.init";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const appointmentsCollection = collection(db, "appointments");

export const createAppointment = async (appointmentData, audioFile) => {
  // const newAppointment = {
  //   ...appointment,
  //   createdAt: Timestamp.now(),
  //   status: "pending",
  // };
  // const docRef = await addDoc(appointmentsCollection, newAppointment);
  // return docRef.id;
  let audioURL = "";
  if (audioFile) {
    const audioRef = ref(storage, `appointments/${audioFile.name}`);
    await uploadBytes(audioRef, audioFile);
    audioURL = await getDownloadURL(audioRef);
  }

  await addDoc(appointmentsCollection, {
    ...appointmentData,
    audioURL,
  });
};

export const getAppointments = async (userId, isScheduler = false) => {
  console.log(userId);
  const q = query(
    appointmentsCollection,
    where(isScheduler ? "schedulerId" : "holderId", "==", userId),
    orderBy("date", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const appointmentDoc = doc(db, "appointments", appointmentId);
  await updateDoc(appointmentDoc, { status });
};

export const cancelAppointment = async (appointmentId) => {
  const appointmentDoc = doc(db, "appointments", appointmentId);
  await updateDoc(appointmentDoc, { status: "cancelled" });
};
