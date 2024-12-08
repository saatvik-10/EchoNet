import { LuLogOut } from "react-icons/lu";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  // const { logout } = useLogout();

  return (
    <div className="mt-auto">
      <LuLogOut className="h-6 w-6 cursor-pointer text-white"
       //onClick={logout} 
       />
    </div>
  );
};
export default LogoutButton;
