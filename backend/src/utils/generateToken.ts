import jwt from 'jsonwebtoken';
import { Context } from 'hono';
import { setCookie } from 'hono/cookie';

const generateToken = (userId: string, ctx: Context) => {
  let token;

  try {
    token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: '15d',
    });
  } catch (err) {
    throw new Error(`Error generating token, ${err}`);
  }

  setCookie(ctx, 'jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });

  return token;
};

export default generateToken;
