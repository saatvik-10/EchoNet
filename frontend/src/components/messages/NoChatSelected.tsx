import { useAuth } from "../../context/AuthContext";
import { LuMessageCircle } from "react-icons/lu";

const NoChatSelected = () => {
  const { authUser } = useAuth();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 px-4 text-center font-semibold text-gray-200 sm:text-lg md:text-xl">
        <p>Welcome 👋 {authUser?.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <LuMessageCircle className="text-center text-3xl md:text-6xl" />
      </div>
    </div>
  );
};

export default NoChatSelected;
