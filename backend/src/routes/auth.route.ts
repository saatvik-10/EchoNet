import { Hono } from 'hono';
import { AuthController } from '../controllers/auth.controller';

const authRouter = new Hono();
const authController = new AuthController();

authRouter.post('/signin', authController.signin);
authRouter.post('/signup', authController.signup);
authRouter.post('/signout', authController.signout);

export default authRouter;
