import { Context } from 'hono';
import prisma from '../db/prisma';

export const sendMsg = async (ctx: Context): Promise<Response> => {
  try {
    const { message } = await ctx.req.json();
    const { id: receiverId } = ctx.req.param();
    const senderId = ctx.get('userId');

    //check if conversation exists
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantsIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    //start of the conversation i.e. first message
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantsIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    //saves the new msg
    const newMsg = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    //update conversation with the new msg
    if (newMsg) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              //connect is a clean way to handle relationships between tables.
              //here it links the newMsg (Message table) to the conversation (Conversation table).
              id: newMsg.id,
            },
          },
        },
      });
    }

    //socket.io will go here later

    return ctx.json(newMsg, 200);
  } catch (err) {
    console.log(err);
    return ctx.json({ err: 'Server Error' }, 500);
  }
};
