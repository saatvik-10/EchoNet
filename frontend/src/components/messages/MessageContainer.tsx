import userConversation from "../../hooks/zustand/userConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
  const { selectedConversation } = userConversation();

  return (
    <div className="flex flex-col md:min-w-[450px]">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="mb-2 flex items-center gap-1 bg-slate-500 px-4 py-2">
            <span className="label-text">To:</span>
            <span className="font-bold text-gray-900">John doe</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;
