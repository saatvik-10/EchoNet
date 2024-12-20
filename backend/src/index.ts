import 'dotenv/config';
import authRoutes from './routes/auth.route';
import msgRoutes from './routes/msg.route';
import { app, server } from './socket/socket';
import path from 'path';
import { serveStatic } from '@hono/node-server/serve-static';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.route('/api/auth', authRoutes); //for signin and signup
app.route('/api/messages', msgRoutes); //for posting and getting msg

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the frontend/dist directory
  app.use('/*', serveStatic({ root: './frontend/dist' }));

  // Catch-all route to serve index.html for client-side routing
  app.get('*', (c) => c.html('./frontend/dist/index.html'));
}

// Start listening
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
