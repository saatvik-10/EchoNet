import { Hono } from 'hono';
import protectRoute from '../middleware/protectRoute';
import { Message } from '../controllers/msg.controller';

const msgRoutes = new Hono();
const msg = new Message();

msgRoutes.get('/conversations', protectRoute, msg.getConversations);
msgRoutes.get('/:id', protectRoute, msg.getMsg);
msgRoutes.post('/send/:id', protectRoute, msg.sendMsg);

export default msgRoutes;
