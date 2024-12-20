import 'dotenv/config';
// import { Hono } from 'hono';
// import { serve } from '@hono/node-server';
import authRoutes from './routes/auth.route';
import msgRoutes from './routes/msg.route';
import { app, server } from './socket/socket';

// const app = new Hono();

const PORT = process.env.PORT || 5000;

app.route('/api/auth', authRoutes); //for signin and signup
app.route('/api/messages', msgRoutes); //for posting and getting msg

// Start listening
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
