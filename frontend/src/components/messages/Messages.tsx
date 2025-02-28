import useGetMsgs from "../../hooks/conversation/useGetMsgs";
import useListenMsg from "../../hooks/conversation/useListenMsg";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useChatScroll from "../../hooks/conversation/useChatScroll";

const Messages = () => {
  const { loading, messages } = useGetMsgs();
  const ref = useChatScroll(messages) as React.RefObject<HTMLDivElement>;

  useListenMsg();

  return (
    <div className="flex-1 overflow-auto px-4" ref={ref}>
      {loading && [...Array(3).map((_, idx) => <MessageSkeleton key={idx} />)]}

      {!loading &&
        messages.map((msg) => <Message key={msg.id} message={msg} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start a conversation...
        </p>
      )}
    </div>
  );
};
export default Messages;
