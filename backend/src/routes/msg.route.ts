import { Hono } from 'hono';
import protectRoute from '../middleware/protectRoute';
import { Message } from '../controllers/msg.controller';

const msgRoutes = new Hono();
const msg = new Message();

msgRoutes.post('/send/:id', protectRoute, msg.sendMsg);
msgRoutes.get('/:id', protectRoute, msg.getMsg);

export default msgRoutes;
