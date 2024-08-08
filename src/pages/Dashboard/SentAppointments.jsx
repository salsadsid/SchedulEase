import Loading from "@/components/common/Loading";
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
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";

const SentAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user: currentUser } = useAuth();
  useEffect(() => {
    setLoading(true);
    if (currentUser?.uid) {
      const fetchAppointments = async () => {
        const appointmentsData = await getAppointments(currentUser?.uid, true);
        setLoading(false);
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
      <h2 className="text-lg font-semibold text-gray-500 py-2 pb-6">
        Sent Appointments
      </h2>
      {loading && (
        <div className="py-20 flex justify-center">
          <Loading />
        </div>
      )}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
        {appointments?.length > 0 &&
          appointments.map((appointment) => (
            <Card key={appointment.id} className="shadow-md">
              <CardHeader>
                <h2 className="flex justify-between text-xl font-bold">
                  {appointment.title}
                  <span className="text-sm font-semibold">
                    Status:{" "}
                    <span
                      className={` p-1 font-normal rounded ${
                        appointment.status === "accepted"
                          ? "bg-green-100"
                          : "bg-orange-100"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </span>
                </h2>
                <p className="text-sm">
                  {dayjs(appointment.date.toDate()).format("MMMM D, YYYY")}{" "}
                  {appointment.time}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="flex flex-col">
                  <span className="text-sm">Details:</span>
                  <span>{appointment.description}</span>
                </p>
                <div>
                  <p className="text-sm mb-1">Holder:</p>
                  <p className="flex gap-2">
                    <span>
                      <CircleUserRound />
                    </span>
                    <span>{appointment.holderName}</span>
                  </p>
                </div>
                {appointment?.audioURL && (
                  <div>
                    <p className="text-sm mb-1">Audio Message</p>
                    <audio controls autoPlay={false}>
                      <source src={appointment.audioURL} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
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
          ))}
        {!loading && appointments?.length < 1 && (
          <div>
            <p>No appointment(s) to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentAppointments;
