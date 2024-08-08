import AppointmentForm from "@/components/appointmentForm/AppointmentForm";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { getUsers } from "@/services/userServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const { user: currentUser, loading } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setUserLoading(true);
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setCurrentUserData(
        usersData.find((user) => user.id === currentUser?.uid)
      );
      setUserLoading(false);
      setUsers(usersData);
    };
    fetchUsers();
  }, [currentUser]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const loadingState = loading || userLoading;
  const filteredUsers = users
    .filter((user) => user.id !== currentUser?.uid)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <div className=" mx-auto ">
      <div className=" pt-16 md:pt-20">
        <div className="container px-4 mx-auto">
          <h1 className="mb-10 text-3xl md:text-5xl lg:text-5xl text-center leading-tight font-bold ">
            Search and <span className="text-primary">Schedule</span>
          </h1>
          <div className="mt-6 max-w-xl bg-gradient-to-r from-orange-50 to-yellow-50 mx-auto p-4 shadow-md border rounded hover:shadow-lg ">
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
          {loadingState && (
            <div className="py-20 flex justify-center">
              <Loading />
            </div>
          )}
          <div className="my-12 flex justify-center items-start flex-wrap gap-6">
            {filteredUsers?.length > 0 &&
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-full bg-gradient-to-r  from-blue-50/50 to-violet-50/50 shadow hover:shadow-lg transition-all duration-200 md:max-w-[350px] rounded border border-primary p-6"
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Create Appointment</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <AppointmentForm
                            currentUserId={currentUser?.uid}
                            currentUserName={currentUserData?.name}
                            targetUserId={user.id}
                            targetUserName={user.name}
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
            {!loadingState && filteredUsers?.length < 1 && (
              <div>
                <p>No user(s) found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
