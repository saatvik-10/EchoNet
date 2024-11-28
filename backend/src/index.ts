import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import authRoutes from './routes/auth.route';
import msgRoutes from './routes/msg.route';

const app = new Hono();

// app.use('*', json())

app.route('/api/auth', authRoutes); //for signin and signup
app.route('/api/messages', msgRoutes); //for posting and getting msg

serve({
  fetch: app.fetch,
  port: 5000,
});
console.log('Server is running on port 5000');
