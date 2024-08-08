import Navbar from "@/components/common/Navbar";
import { useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <div>
      <Navbar isDashboard={location.pathname.includes("/appointment")} />
    </div>
  );
};

export default DashboardLayout;
