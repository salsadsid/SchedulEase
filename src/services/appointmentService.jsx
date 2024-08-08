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

// Reference to the 'appointments' collection in Firestore
const appointmentsCollection = collection(db, "appointments");

// Function to create a new appointment
export const createAppointment = async (appointmentData, audioFile) => {
  let audioURL = "";

  // If an audio file is provided, upload it to Firebase storage and get the download URL
  if (audioFile) {
    const audioRef = ref(storage, `appointments/${audioFile.name}`);
    await uploadBytes(audioRef, audioFile);
    audioURL = await getDownloadURL(audioRef);
  }

  // Add a new document to the 'appointments' collection with the appointment data and audio URL
  await addDoc(appointmentsCollection, {
    ...appointmentData,
    audioURL,
  });
};

// Function to retrieve appointments for a specific user
export const getAppointments = async (userId, isScheduler = false) => {
  //  Create a query to get appointments where the user is either the scheduler or holder, ordered by date in descending order
  const q = query(
    appointmentsCollection,
    where(isScheduler ? "schedulerId" : "holderId", "==", userId),
    orderBy("date", "desc")
  );

  // Execute the query and return the results as an array of appointment objects
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Function to update the status of an appointment
export const updateAppointmentStatus = async (appointmentId, status) => {
  // Get a reference to the specific appointment document
  const appointmentDoc = doc(db, "appointments", appointmentId);

  // Update the status field of the appointment document
  await updateDoc(appointmentDoc, { status });
};

// Function to cancel an appointment by setting its status to 'cancelled'
export const cancelAppointment = async (appointmentId) => {
  const appointmentDoc = doc(db, "appointments", appointmentId);
  await updateDoc(appointmentDoc, { status: "cancelled" });
};
