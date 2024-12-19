import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../../hooks/zustand/useConversation";
import useGetConversations from "../../hooks/conversation/useGetConversations";
import { ConversationType } from "../../types/conversation";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const { conversations } = useGetConversations();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!search.trim()) return;
    if(search.length < 3) {
      toast.error("Search term must be at least 3 characters long");
      return;
    }

    const conversation = conversations.find((convo:ConversationType)=>convo.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("Searched user not found");
    }
  }

  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <LuSearch className="h-6 w-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
