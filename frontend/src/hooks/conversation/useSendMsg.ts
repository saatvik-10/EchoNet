import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMsg = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMsg = async (message: string) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.err);
      setMessages([...messages, data]);
    } catch (err: any) {
      const errMsg = err.message || "An unexpected error occurred";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { sendMsg, loading };
};

export default useSendMsg;
