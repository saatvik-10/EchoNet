import { Hono } from 'hono';

const msgRoutes = new Hono();

msgRoutes.get('/conversations', async (c) => {
  c.text('Hello from Hono!');
});

export default msgRoutes;
