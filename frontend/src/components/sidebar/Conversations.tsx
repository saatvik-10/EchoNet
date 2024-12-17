import Conversation from "./Conversation";
import useGetConversations from "../../hooks/conversation/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations: React.FC = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="flex flex-col overflow-auto py-2">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={getRandomEmoji()}
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Conversations;
