import { cn } from "@/lib/utils";

const Loading = ({ className }) => {
  return (
    <div
      className={cn(
        " border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700"
      )}
    ></div>
  );
};

export default Loading;
