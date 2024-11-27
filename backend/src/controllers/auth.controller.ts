import { Context } from 'hono';

export class AuthController {
  async signup(ctx: Context): Promise<Response> {
    return ctx.text('Signed Up');
  }

  async signin(ctx: Context): Promise<Response> {
    return ctx.text('Signed In');
  }

  async signout(ctx: Context): Promise<Response> {
    return ctx.text('Signed Out');
  }
}
