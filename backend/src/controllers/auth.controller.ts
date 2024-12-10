import { Context } from 'hono';
import prisma from '../db/prisma';
import bcryptjs from 'bcryptjs';
import generateToken from '../utils/generateToken';
import { deleteCookie } from 'hono/cookie';

export class Authentication {
  async signup(ctx: Context): Promise<Response> {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        await ctx.req.json();

      if (!fullName || !username || !password || !confirmPassword || !gender) {
        return ctx.json({ error: 'Please fill in all fields' }, 400);
      }

      if (password !== confirmPassword) {
        return ctx.json({ error: 'Passwords do not match' }, 400);
      }

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (user) {
        return ctx.json({ error: 'Username is already taken' }, 400);
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
      const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;

      const newUser = await prisma.user.create({
        data: {
          fullName,
          username,
          password: hashedPassword,
          gender,
          profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        },
      });

      if (newUser) {
        await generateToken(newUser.id, ctx);

        return ctx.json(
          {
            id: newUser.id,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
          },
          201
        );
      } else {
        return ctx.json({ error: 'Invalid Data' }, 400);
      }
    } catch (err) {
      console.log(err);
      return ctx.json({ error: 'Server Error' }, 500);
    }
  }

  async signin(ctx: Context): Promise<Response> {
    try {
      const { username, password } = await ctx.req.json();

      if (!username || !password) {
        return ctx.json({ error: 'Please fill in all the fields' }, 400);
      }

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return ctx.json({ error: 'Invalid Credentials' }, 400);
      }

      const isPswdCorrect = await bcryptjs.compare(password, user.password);

      if (!isPswdCorrect) {
        return ctx.json({ error: 'Invalid Credentials' }, 400);
      }

      await generateToken(user.id, ctx);

      return ctx.json(
        {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
        },
        200
      );
    } catch (err) {
      console.log(err);
      return ctx.json({ error: 'Server Error' }, 500);
    }
  }

  async signout(ctx: Context): Promise<Response> {
    try {
      deleteCookie(ctx, 'jwt');
      return ctx.json({ message: 'Signed Out' }, 200);
    } catch (err) {
      console.log(err);
      return ctx.json({ error: 'Server Error' }, 500);
    }
  }

  async getMe(ctx: Context): Promise<Response> {
    try {
      const id = ctx.get('userId');

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        return ctx.json({ error: 'User not found' }, 404);
      }

      return ctx.json(
        {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
        },
        200
      );
    } catch (err) {
      console.log(err);
      return ctx.json({ error: 'Server Error' }, 500);
    }
  }
}
