import * as jwt from 'hono/jwt';
import { setCookie } from 'hono/cookie';
import { Context } from 'hono';

const secretKey = process.env.JWT_SECRET!;

const generateToken = async (userId: string, ctx: Context) => {
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
  };

  const token = await jwt.sign(payload, secretKey);

  setCookie(ctx, 'jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'deployment',
    maxAge: 15 * 24 * 60 * 60,
    sameSite: 'strict',
  });
  return token;
};
export default generateToken;