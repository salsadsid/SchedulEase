import AppointmentForm from "@/components/appointmentForm/AppointmentForm";
import CompanyName from "@/components/common/CompanyName";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { getUsers } from "@/services/userServices";
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="flex absolute   start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"></div>
          <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"></div>
        </div>

        <div className="relative z-10 ">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 lg:pt-16">
            <div className="max-w-2xl text-center mx-auto">
              <div className="w-full max-w-4xl mx-auto sm:px-12 mb-10 lg:mb-8">
                <h1 className="font-inter font-bold text-4xl leading-snug sm:text-5xl text-center mb-5 text-black">
                  Effortless Appointment Management
                </h1>
                <p className="text-xl font-medium leading-8 text-gray-400 text-center mb-14 max-w-xl mx-auto">
                  Stay organized, stay on top of your schedule. With{" "}
                  <CompanyName className="text-xl" />, managing your
                  appointments has never been easier.
                </p>
                <div className="parent flex flex-col sm:flex-row items-center max-w-xl mx-auto justify-center gap-y-4 sm:justify-between pr-2 sm:pr-1 sm:bg-white rounded-full mb-5 relative group transition-all duration-500 border border-transparent hover:border-indigo-600 focus-within:border-indigo-600">
                  <input
                    type="text"
                    className="block w-full px-6 py-3.5 text-base max-sm:text-center font-normal shadow-xs max-sm:bg-white text-gray-900 bg-transparent border-none rounded-full placeholder-gray-400 focus:outline-none leading-normal"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="max-w-md rounded p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 "
          >
            <div className="rounded p-6 bg-white dark:bg-gray-900">
              <div className="flex flex-col gap-y-4 ">
                <div className="flex items-center gap-2">
                  <CircleUserRound />
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                      {user.name}
                    </h3>
                    <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Create Appointment</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] ">
                    <AppointmentForm
                      currentUserId={currentUser?.uid}
                      targetUserId={user.id}
                      currentUserName={user.name}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
