import { LuLogOut } from "react-icons/lu";
import useSignOut from "../../hooks/useSignOut";

const SignOutBtn = () => {
  const { signout } = useSignOut();

  return (
    <div className="mt-auto">
      <LuLogOut
        className="h-6 w-6 cursor-pointer text-white"
        onClick={signout}
      />
    </div>
  );
};
export default SignOutBtn;
