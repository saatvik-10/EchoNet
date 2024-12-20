import 'dotenv/config';
import authRoutes from './routes/auth.route';
import msgRoutes from './routes/msg.route';
import { app, server } from './socket/socket';
import path from 'path';

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.route('/api/auth', authRoutes); //for signin and signup
app.route('/api/messages', msgRoutes); //for posting and getting msg

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
//   })
// }

app.get("/", (c) => {
  return c.text("Hello World");
});

// Start listening
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
