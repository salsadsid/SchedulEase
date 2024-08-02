import CompanyName from "@/components/common/CompanyName";

const Home = () => {
  return (
    <div className="min-h-[90vh] bg-gradient-to-r from-indigo-50 to-green-50 flex justify-center items-center font-semibold text-gray-800 text-7xl">
      <span>
        Welcome to <CompanyName />
      </span>
    </div>
  );
};

export default Home;
