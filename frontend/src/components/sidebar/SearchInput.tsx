import { LuSearch } from "react-icons/lu";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <LuSearch className="h-6 w-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
