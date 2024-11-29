import { Hono } from 'hono';
import protectRoute from "../middleware/protectRoute";
import {sendMsg} from "../controllers/msg.controller";

const msgRoutes = new Hono();

msgRoutes.post('/send/:id', protectRoute, sendMsg);

export default msgRoutes;
