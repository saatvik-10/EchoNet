import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="flex flex-col md:min-w-[450px]">
      <>
        {/* Header */}
        <div className="mb-2 bg-slate-500 px-4 py-2">
          <span className="label-text">To:</span>{" "}
          <span className="font-bold text-gray-900">John doe</span>
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
