import Conversations from "./Conversations";
import SignOutBtn from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="flex w-44 flex-col border-r border-slate-500 p-1 md:w-1/2 md:p-4">
      <SearchInput />
      <div className="divider px-3" />
      <Conversations />
      <SignOutBtn />
    </div>
  );
};
export default Sidebar;
