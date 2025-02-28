import 'dotenv/config';
import authRoutes from './routes/auth.route';
import msgRoutes from './routes/msg.route';
import { app, server } from './socket/socket';

const PORT = process.env.PORT || 5000;

app.route('/api/auth', authRoutes); //for signin and signup
app.route('/api/messages', msgRoutes); //for posting and getting msg

// if (process.env.NODE_ENV === 'production') {
//   const staticPath = path.join(__dirname, '/frontend/dist');

//   // Serve static files from the frontend/dist directory
//   app.use('/*', serveStatic({ root: staticPath }));

//   // Catch-all route to serve index.html for client-side routing
//   app.get('*', (c) => c.html(path.join(staticPath, 'index.html')));
// }

app.get('/', async (c) => {
  return c.text('Hello World');
});

// Start listening
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
