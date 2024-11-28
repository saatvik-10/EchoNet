import { Hono } from 'hono';
import { Authentication } from '../controllers/auth.controller';
import protectRoute from '../middleware/protectRoute';

const authRouter = new Hono();
const auth = new Authentication();

authRouter.get('/me', protectRoute, auth.getMe);
authRouter.post('/signup', auth.signup);
authRouter.post('/signin', auth.signin);
authRouter.post('/signout', auth.signout);

export default authRouter;
