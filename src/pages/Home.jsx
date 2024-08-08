import CompanyName from "@/components/common/CompanyName";
import Footer from "@/components/homePageComponents/Footer";
import HowItWorks from "@/components/homePageComponents/HowItWorks";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user: currentUser } = useAuth();

  return (
    <div className=" mx-auto ">
      <div className="bg-gradient-to-r from-pink-100 to-yellow-100 pt-16 md:pt-20">
        <div className="container px-4 mx-auto">
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
                <CompanyName className="text-xl" />, managing your appointments
                has never been easier.
              </p>
              <div className="flex flex-wrap">
                <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                  <Link
                    className="inline-block py-3 px-7 w-full text-base md:text-lg leading-4 text-indigo-50 font-medium text-center bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 border border-indigo-500 rounded-md shadow-sm"
                    to="appointment/recieve"
                  >
                    Appointments
                  </Link>
                </div>
                {!currentUser ? (
                  <div className="w-full md:w-auto py-1 md:py-0">
                    <Link
                      className="inline-block py-3 px-7 w-full text-base md:text-lg leading-4 text-indigo-800 font-medium text-center bg-white hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 border border-indigo-200 rounded-md shadow-sm"
                      to="signup"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="w-full md:w-auto py-1 md:py-0">
                    <Link
                      className="inline-block py-3 px-7 w-full text-base md:text-lg leading-4 text-indigo-800 font-medium text-center bg-white hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 border border-indigo-200 rounded-md shadow-sm"
                      to="users"
                    >
                      Users
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="md:block hidden md:w-1/2 px-4">
              <div className="relative mx-auto md:mr-0 max-w-max">
                <img
                  className="relative rounded-7xl"
                  src="appointment.png"
                  alt="appointment graphics"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
