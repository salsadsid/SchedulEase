import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import {
  cancelAppointment,
  getAppointments,
} from "@/services/appointmentService";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const SentAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const { user: currentUser } = useAuth();
  useEffect(() => {
    if (currentUser?.uid) {
      const fetchAppointments = async () => {
        const appointmentsData = await getAppointments(currentUser?.uid, true);
        setAppointments(appointmentsData);
      };
      fetchAppointments();
    }
  }, [currentUser]);

  const handleCancelAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId);
    // Update the local state to reflect the change
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "cancelled" }
          : appointment
      )
    );
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {appointments?.length > 0 ? (
          appointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-md">
              <CardHeader>
                <h2 className="text-xl font-bold">{appointment.title}</h2>
                <p>
                  {dayjs(appointment.date.toDate()).format(
                    "MMMM D, YYYY h:mm A"
                  )}
                </p>
                <p>Status: {appointment.status}</p>
              </CardHeader>
              <CardContent>
                <p>{appointment.description}</p>
              </CardContent>
              <CardFooter>
                {appointment.status !== "cancelled" && (
                  <Button
                    className={`p-2 ${
                      dayjs().isAfter(dayjs(appointment.date.toDate()))
                        ? "bg-gray-500"
                        : "bg-red-500"
                    } text-white rounded mt-4`}
                    onClick={() => handleCancelAppointment(appointment.id)}
                    disabled={dayjs().isAfter(dayjs(appointment.date.toDate()))}
                  >
                    Cancel
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default SentAppointments;
