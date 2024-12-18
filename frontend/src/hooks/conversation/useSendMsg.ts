import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMsg = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMsg = async (msg: string) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg }),
      });
      const data = await res.json();
      if (data.err) throw new Error(data.err);
      setMessages([...messages, data]);
    } catch (err: any) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { sendMsg, loading };
};

export default useSendMsg;
