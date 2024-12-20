import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocket } from "../../context/SocketContext";

const useListenMsg = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMsg", (newMsg) => {
      setMessages([...messages, newMsg]);
    });
  }, [socket, messages, setMessages]);
};

export default useListenMsg;
