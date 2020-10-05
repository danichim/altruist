import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './auth.dto';
import { User } from "../user/user.entity";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  /**
   * @swagger
   *
   * /auth/login:
   *   post:
   *     tags:
   *       - auth
   *     description: Login user
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           required:
   *             - email
   *             - password
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Post('login')
  async login(@Body() user: LoginUserDTO): Promise<any> {
    return this.authService.login(user);
  }

  /**
   * @swagger
   *
   * /auth/register:
   *   post:
   *     tags:
   *       - auth
   *     description: Register user
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           $ref: '#/definitions/User'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }

  /**
   * @swagger
   *
   * /auth/update:
   *   post:
   *     tags:
   *       - auth
   *     description: update user
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           $ref: '#/definitions/User'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @UseGuards(new AuthGuard())
  @Post('update')
  async update(@Body() user: any, @Req() req): Promise<any> {
    user.id = req.user.id;
    return this.authService.update(user);
  }
}
