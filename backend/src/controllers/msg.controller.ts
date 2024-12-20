import { Context } from 'hono';
import prisma from '../db/prisma';
import { getReceiverSocketId } from '../socket/socket';
import { io } from '../socket/socket';

export class Message {
  async sendMsg(ctx: Context): Promise<Response> {
    try {
      const { message } = await ctx.req.json();
      const { id: receiverId } = ctx.req.param();
      const senderId = ctx.get('userId');

      //check if conversation exists
      let conversation = await prisma.conversation.findFirst({
        where: {
          participantIds: {
            hasEvery: [senderId, receiverId],
          },
        },
      });

      //start of the conversation i.e. first message
      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            participantIds: {
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
        await prisma.conversation.update({
          where: {
            id: conversation.id,
          },
          data: {
            messages: {
              connect: {
                //connect is a clean way to handle relationships between tables.
                //here it links the newMsg (Message Table) to the conversation (Conversation Table).
                id: newMsg.id,
              },
            },
          },
        });
      }

      //socket.io
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMsg', newMsg);
      }

      return ctx.json(newMsg, 200);
    } catch (err) {
      console.log(err);
      return ctx.json({ err: 'Server Error' }, 500);
    }
  }

  async getMsg(ctx: Context): Promise<Response> {
    try {
      const { id: userToChatId } = ctx.req.param();
      const senderId = ctx.get('userId');

      const conversation = await prisma.conversation.findFirst({
        where: {
          participantIds: {
            hasEvery: [senderId, userToChatId],
          },
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });

      if (!conversation) {
        console.log('Conversation not found!');
        return ctx.json({ err: 'No conversation found' }, 404);
      }

      return ctx.json(conversation.messages, 200);
    } catch (err) {
      console.log(err);
      return ctx.json({ err: 'Server Error' }, 500);
    }
  }
  async getConversations(ctx: Context): Promise<Response> {
    try {
      const authUserId = ctx.get('userId');

      const users = await prisma.user.findMany({
        where: {
          id: {
            not: authUserId, //want to see users u are chatting with and not yourself
          },
        },
        select: {
          id: true,
          fullName: true,
          profilePic: true,
        },
      });
      return ctx.json(users, 200);
    } catch (err) {
      console.log(err);
      return ctx.json({ err: 'Server Error' }, 500);
    }
  }
}
