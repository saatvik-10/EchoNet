import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { decode, verify } from 'hono/jwt';
import prisma from '../db/prisma';

const protectRoute = async (ctx: Context, next: Next) => {
  try {
    const token = getCookie(ctx, 'jwt');

    if (!token) {
      return ctx.json({ error: 'Not Authorized' }, 401);
    }

    const isValid = verify(token, process.env.JWT_SECRET!);
    if (!isValid) {
      return ctx.json({ error: 'Invalid Token' }, 401);
    }

    const decoded = decode(token);
    if (!decoded) {
      return ctx.json({ error: 'Not Authorized' }, 401);
    }

    const userId = decoded.payload.userId as string;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return ctx.json({ error: 'User not found' }, 404);
    }

    ctx.set('userId', user.id);

    await next();
  } catch (err) {
    console.error('Error in protectRoute:', err);
    return ctx.json({ error: 'Server Error' }, 500);
  }
};

export default protectRoute;
