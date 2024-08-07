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
import { useEffect, useState } from "react";

const ReceivedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("upcoming");
  console.log("SchedulEase Mark 3", appointments);
  const { user: currentUser } = useAuth();
  console.log(currentUser);
  useEffect(() => {
    if (currentUser?.uid) {
      const fetchAppointments = async () => {
        const appointmentsData = await getAppointments(currentUser.uid);
        setAppointments(appointmentsData);
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
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment
      )
    );
  };
  const filteredAppointments = appointments
    .filter(
      (appointment) =>
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((appointment) => {
      const now = dayjs();
      if (filter === "upcoming") {
        return dayjs(appointment.date.toDate()).isAfter(now);
      }
      if (filter === "past") {
        return dayjs(appointment.date.toDate()).isBefore(now);
      }
      return true;
    });
  return (
    <div className="container mx-auto p-4">
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
          className="p-2 border rounded w-full"
        >
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="shadow-md">
            <CardHeader>
              <h2 className="text-xl font-bold">{appointment.title}</h2>
              <p>
                {dayjs(appointment.date.toDate()).format("MMMM D, YYYY h:mm A")}
              </p>
              <p>Status: {appointment.status}</p>
            </CardHeader>
            <CardContent>
              <p>{appointment.description}</p>
              <p>{appointment.schedulerName}</p>
              {appointment?.audioURL && (
                <audio controls autoPlay={false}>
                  <source src={appointment.audioURL} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </CardContent>
            <CardFooter>
              {filter === "upcoming" && (
                <div className="flex space-x-2 mt-4">
                  <Button
                    className="p-2 bg-green-500 text-white rounded"
                    onClick={() =>
                      handleUpdateStatus(appointment.id, "accepted")
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    variant="secondary"
                    className="p-2 bg-red-500 text-white rounded"
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
      </div>
    </div>
  );
};

export default ReceivedAppointments;
