import useConversation from "../../hooks/zustand/useConversation";
import { ConversationType } from "../../types/conversation";

const Conversation = ({
  conversation,
  emoji,
}: {
  conversation: ConversationType;
  emoji: string;
}) => {
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = selectedConversation?.id === conversation.id;

  return (
    <>
      <div
        className={`flex cursor-pointer items-center gap-2 rounded p-2 py-1 hover:bg-sky-500 ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="#" />
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex justify-between gap-3">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 h-1 py-0" />
    </>
  );
};
export default Conversation;
