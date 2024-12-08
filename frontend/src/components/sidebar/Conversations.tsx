import Conversation from "./Conversation";
// import { DUMMY_CONVERSATIONS } from "../../dummy_data/dummy";

// interface ConversationProps {
//     id: number;
//     fullName: string;
//     profilePic: string;
//     emoji: string;
// }

const Conversations: React.FC = () => {
  return (
    <div className="flex flex-col overflow-auto py-2">
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      {/* {DUMMY_CONVERSATIONS.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))} */}
    </div>
  );
};
export default Conversations;
