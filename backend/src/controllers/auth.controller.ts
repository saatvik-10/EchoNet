import { Context } from 'hono';
import prisma from '../db/prisma';
import bcryptjs from 'bcryptjs';

export class AuthController {
  async signup(ctx: Context): Promise<Response> {
    try {
      // return ctx.text('Signed Up');
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

      const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?{username=${username}}`;
      const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?{username=${username}}`;

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
        //generate new token

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
      return ctx.json({ error: 'Server Error' }, 500);
    }
  }

  async signin(ctx: Context): Promise<Response> {
    return ctx.text('Signed In');
  }

  async signout(ctx: Context): Promise<Response> {
    return ctx.text('Signed Out');
  }
}
