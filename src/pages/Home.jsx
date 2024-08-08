import AppointmentForm from "@/components/appointmentForm/AppointmentForm";
import CompanyName from "@/components/common/CompanyName";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { getUsers } from "@/services/userServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user: currentUser, loading } = useAuth();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appointmentDialog, setAppointmentDialog] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(currentUser?.uid);
      setUsers(usersData);
    };
    fetchUsers();
  }, [currentUser]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className=" mx-auto">
      <div className="container">
        <div className=" pt-16 md:pt-20">
          <div className=" px-4 mx-auto">
            <div className="flex flex-wrap xl:items-center -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
                <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-primary uppercase rounded-9xl">
                  Growing
                </span>
                <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold ">
                  Effortless Appointment Management
                </h1>
                <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
                  Stay organized, stay on top of your schedule. With{" "}
                  <CompanyName className="text-xl" />, managing your
                  appointments has never been easier.
                </p>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                    <Link
                      className="inline-block py-3 px-7 w-full text-base md:text-lg leading-4 text-indigo-50 font-medium text-center bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border border-indigo-500 rounded-md shadow-sm"
                      href="#"
                    >
                      Request a Demo
                    </Link>
                  </div>
                  <div className="w-full md:w-auto py-1 md:py-0">
                    <Link
                      className="inline-block py-3 px-7 w-full text-base md:text-lg leading-4 text-indigo-800 font-medium text-center bg-white hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 border border-indigo-200 rounded-md shadow-sm"
                      to="signup"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
              <div className="md:block hidden md:w-1/2 px-4">
                <div className="relative mx-auto md:mr-0 max-w-max">
                  <img
                    className="relative rounded-7xl"
                    src="appointment.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 max-w-xl bg-gray-100 mx-auto p-4 shadow-md border rounded hover:shadow-lg ">
          <div className="flex bg-white px-4 py-3 rounded border overflow-hidden max-w-xl mx-auto ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-gray-600 mr-3 rotate-90"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full text-md outline-none bg-transparent text-gray-600 "
            />
          </div>
        </div>
        {loading && (
          <div className="py-20 flex justify-center">
            <Loading />
          </div>
        )}
        <div className="my-12  flex justify-center items-start flex-wrap gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="w-full md:max-w-[320px] rounded border border-primary p-6"
            >
              <div className="flex flex-col gap-y-4 ">
                <div className="flex items-center gap-4">
                  <img
                    src="user-avatar.svg"
                    alt="User Avator"
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                      {user.name}
                    </h3>
                    <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                </div>
                {currentUser ? (
                  <Dialog
                    open={appointmentDialog}
                    onOpenChange={setAppointmentDialog}
                  >
                    <DialogTrigger asChild>
                      <Button>Create Appointment</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <AppointmentForm
                        currentUserId={currentUser?.uid}
                        targetUserId={user.id}
                        currentUserName={user.name}
                        onSetAppointmentDialog={setAppointmentDialog}
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <p className="text-center text-sm bg-orange-50 p-2 rounded-md">
                    <Link
                      className="text-indigo-500 hover:underline"
                      to="/login"
                    >
                      Sign in
                    </Link>{" "}
                    to schedule your appointment
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
