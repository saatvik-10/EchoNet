import { LuSend } from "react-icons/lu";

const MessageInput = () => {
  return (
    <form className="my-3 px-4">
      <div className="flex items-center justify-between w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white">
        <input
          type="text"
          className="bg-transparent w-full focus:outline-none"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className=""
        >
          <LuSend />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
