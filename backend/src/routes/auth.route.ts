import { Hono } from 'hono';
import { Authentication } from '../controllers/auth.controller';

const authRouter = new Hono();
const auth = new Authentication();

authRouter.post('/signup', auth.signup);
authRouter.post('/signin', auth.signin);
authRouter.post('/signout', auth.signout);

export default authRouter;
