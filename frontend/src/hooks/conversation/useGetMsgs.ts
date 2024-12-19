import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMsgs = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMsgs = async () => {
      if (!selectedConversation) return;
      setLoading(true);
      setMessages([]);
      try {
        const res = await fetch(`/api/messages/${selectedConversation.id}`);
        const data = await res.json();
        // if (!res.ok) throw new Error(data.err);
        setMessages(data);
        console.log(data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    getMsgs();
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMsgs;
