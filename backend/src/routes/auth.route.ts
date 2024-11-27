import { Hono } from 'hono';

const authRouter = new Hono();

authRouter.get('/login', async (res) => res.text('Signed In'));
authRouter.get('/signup', async (res) => res.text('Signed Up'));
authRouter.get('/logout', async (res) => res.text('Logged Out'));

export default authRouter;
