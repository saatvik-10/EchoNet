import { Server } from 'socket.io';
import { Hono } from 'hono';
import { createAdaptorServer } from '@hono/node-server';
// import { cors } from 'hono/cors';

const app = new Hono();

// Apply CORS middleware
// app.use(
//   '/*',
//   cors({
//     origin: ['http://localhost:5173'],
//     allowMethods: ['GET', 'POST'],
//   })
// );

// Create server using Hono's adaptor
const server = createAdaptorServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
  },
});

// Helper function to get receiver's socket ID
export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

// Map to store user ID to socket ID mapping
const userSocketMap: { [key: string]: string } = {}; // {userId: socketId}

// Socket.io connection handling
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit online users to all connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Handle disconnect event
  socket.on('disconnect', () => {
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server };
