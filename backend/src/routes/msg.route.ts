import { Hono } from 'hono';

const msgRoutes = new Hono();

msgRoutes.get('/conversations', async (res) => {
  res.text('Hello from Hono!');
});

export default msgRoutes;
