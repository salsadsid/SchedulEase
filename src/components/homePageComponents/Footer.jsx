import { Link } from "react-router-dom";
import CompanyName from "../common/CompanyName";

const Footer = () => {
  return (
    <footer className=" bg-indigo-50   ">
      <div className="w-full py-4 mx-auto ">
        <div className="sm:flex container sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <CompanyName className="text-lg" />
          </Link>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/users" className="hover:underline me-4 md:me-6">
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/appointment/recieve"
                className="hover:underline me-4 md:me-6"
              >
                Appointments
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-300 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <span className="hover:underline">Salman Sadik Siddiquee</span>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
