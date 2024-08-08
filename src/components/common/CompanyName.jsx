import { cn } from "@/lib/utils";

const CompanyName = ({ className }) => {
  return (
    <span className={cn("font-bold text-indigo-500 text-7xl", className)}>
      Schedul<span className="text-indigo-600/80">Ease</span>
    </span>
  );
};

export default CompanyName;
