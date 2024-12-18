import useGetMsgs from "../../hooks/conversation/useGetMsgs";
import Message from "./Message";

const Messages = () => {
  const { messages} = useGetMsgs();

  return (
    <div className="flex-1 overflow-auto px-4">
      {messages.map((msg)=>(
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
};
export default Messages;
