import { useEffect, useState } from "react";
import useGetMsgs from "../../hooks/conversation/useGetMsgs";
import useListenMsg from "../../hooks/conversation/useListenMsg";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { loading, messages } = useGetMsgs();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useListenMsg();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 overflow-auto px-4">
      {showSkeleton &&
        loading && [...Array(3).map((_, idx) => <MessageSkeleton key={idx} />)]}

      {!showSkeleton &&
        !loading &&
        messages.map((msg) => <Message key={msg.id} message={msg} />)}

      {!showSkeleton && !loading && messages.length === 0 && (
        <p className="text-center text-white">
          Send a message to start a conversation...
        </p>
      )}
    </div>
  );
};
export default Messages;
