import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocket } from "../../context/SocketContext";
import notificationSound from "../../assets/sounds/notification.mp3";

const useListenMsg = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMsg", (newMsg) => {
      newMsg.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMsg]);
    });
    return () => {
      socket?.off("newMsg");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMsg;
