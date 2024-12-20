export type ConversationType = {
  id: string;
  fullName: string;
  profilePic: string;
};

export type MessageType = {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
  shouldShake?: boolean;
};
