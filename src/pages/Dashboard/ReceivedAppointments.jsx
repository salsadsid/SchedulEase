import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
  getAppointments,
  updateAppointmentStatus,
} from "@/services/appointmentService";
import dayjs from "dayjs";
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";

const ReceivedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const { user: currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (currentUser?.uid) {
      const fetchAppointments = async () => {
        const appointmentsData = await getAppointments(currentUser.uid);
        setAppointments(appointmentsData);
        setLoading(false);
      };
      fetchAppointments();
    }
  }, [currentUser]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const handleUpdateStatus = async (appointmentId, status) => {
    await updateAppointmentStatus(appointmentId, status);
    // Update the local state to reflect the change
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment
      )
    );
  };
  const now = dayjs();
  const filteredAppointments = appointments
    .filter(
      (appointment) =>
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((appointment) => {
      if (filter === "upcoming") {
        return dayjs(appointment.date.toDate()).isAfter(now);
      }
      if (filter === "past") {
        return dayjs(appointment.date.toDate()).isBefore(now);
      }
      return appointment;
    });
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold text-gray-500 py-2 pb-6">
        Received Appointments
      </h2>
      <div className="flex gap-4">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="px-2 py-[8px] focus:outline focus:outline-primary focus:outline-2 focus:outline-offset-2 border rounded w-full"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>
      {loading && (
        <div className="py-20 flex justify-center">
          <Loading />
        </div>
      )}
      <div className="grid grid-cols-1   lg:grid-cols-2 gap-4">
        {filteredAppointments?.length > 0 &&
          filteredAppointments.map((appointment) => (
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
                  <p className="text-sm mb-1">Sent by:</p>
                  <p className="flex gap-2">
                    <span>
                      <CircleUserRound />
                    </span>
                    <span>{appointment.schedulerName}</span>
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
                {dayjs(appointment.date.toDate()).isAfter(now) &&
                  appointment.status === "pending" && (
                    <div className="flex space-x-2 mt-4">
                      <Button
                        onClick={() =>
                          handleUpdateStatus(appointment.id, "accepted")
                        }
                      >
                        Accept
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleUpdateStatus(appointment.id, "declined")
                        }
                      >
                        Decline
                      </Button>
                    </div>
                  )}
              </CardFooter>
            </Card>
          ))}
        {!loading && filteredAppointments?.length < 1 && (
          <div>
            <p>No appointment(s) to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceivedAppointments;
