import { useState } from "react";
import useSendMsg from "../../hooks/conversation/useSendMsg";
import { LuSend } from "react-icons/lu";

const MessageInput = () => {
  const [msg, setMsg] = useState("");

  const { loading, sendMsg } = useSendMsg();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg.trim()) return;
    await sendMsg(msg);
    setMsg("");
  };

  return (
    <form className="my-3 px-4" onSubmit={handleSubmit}>
      <div className="flex w-full items-center justify-between rounded-lg border-2 border-gray-600 bg-gray-700 p-2.5 text-sm text-white focus-within:border-white">
        <input
          type="text"
          className="w-full bg-transparent focus:outline-none"
          placeholder="Send a message"
        />
        <button type="submit">
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <LuSend className="size-4" />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
