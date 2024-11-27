import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import authRoutes from './routes/auth.route';
import msgRoutes from './routes/msg.route';

const app = new Hono();

app.route('/api/auth', authRoutes); //for signin and signup
app.route('/api/messages', msgRoutes); //for posting and getting msg

serve({
  fetch: app.fetch,
  port: 5000,
});
