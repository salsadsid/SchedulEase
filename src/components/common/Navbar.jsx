import { useAuth } from "@/context/AuthContext";
import { CircleUser, Menu } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CompanyName from "./CompanyName";

const Navbar = ({ isDashboard }) => {
  const { user, logOut } = useAuth();

  return (
    <div className="flex  w-full flex-col">
      <header className="sticky z-10 bg-white justify-between top-0 flex h-16 items-center gap-4 border-b  px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <CompanyName className="text-xl" />
              </Link>
              {user ? (
                <>
                  <NavLink
                    to="/appointment/recieve"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Received Appointments
                  </NavLink>
                  <NavLink
                    to="/appointment/sent"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sent Appointments
                  </NavLink>
                </>
              ) : (
                <>
                  <Link
                    to="/users"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Users
                  </Link>
                  <Link
                    to="/appointment/recieve"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Appointments
                  </Link>
                  <Link
                    to="login"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Login
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <CompanyName className="text-lg" />
          </Link>
        </nav>

        <div className="flex w-full items-center gap-4 md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                to="/users"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Users
              </Link>
              <Link
                to="/appointment/recieve"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Appointments
              </Link>
              {!user && (
                <Link
                  to="/login"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Login
                </Link>
              )}
            </nav>{" "}
          </div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <div className="flex px-4 flex-col items-center justify-center gap-y-2">
                    <p className="font-medium"> My Account</p>

                    <img
                      src="user-avatar.svg"
                      alt="Avator"
                      className="w-12 h-12"
                    />
                    <p className="text-sm">{user?.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logOut}
                  className="cursor-pointer bg-primary  flex justify-center rounded text-white"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      {isDashboard && (
        <div className="flex min-h-[90vh]    border-l  w-full  gap-4 bg-muted/40 ">
          <div className="min-w-[320px] max-w-[350px] p-6 hidden md:block  border-r ">
            <nav className="grid gap-4  text-sm text-muted-foreground">
              <div className="mx-auto  lg:mx-4 grid w-full max-w-6xl gap-2">
                <h1 className="text-xl mb-12 font-semibold">
                  Appointment Dashboard
                </h1>
              </div>
              <NavLink to="/appointment/recieve" className="font-semibold ">
                Received Appointments
              </NavLink>
              <NavLink to="/appointment/sent" className="font-semibold ">
                Sent Appointments
              </NavLink>
            </nav>
          </div>
          <div className="flex-1 gap-6">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
