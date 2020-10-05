import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { OrderService } from "./orders.service";
import { Order } from "./order.entity";
import { FindOneOrder } from "./order.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller('order')
@UseGuards(new AuthGuard())
export class OrderController {
  constructor(private orderService: OrderService) {
  }

  /**
   * @swagger
   *
   * /order:
   *   get:
   *     tags:
   *       - order
   *     description: Get all orders
   *     security:
   *       - bearer: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Get()
  index(@Req() req): Promise<Order[]> {
    return this.orderService.findAll(req.user.id);
  }

  /**
   * @swagger
   *
   * /order/gps:
   *   get:
   *     tags:
   *       - order
   *     description: Get all orders in range of user action perimiter
   *     security:
   *       - bearer: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  @Get('gps')
  getGps(@Req() req): Promise<Order[]> {
    return this.orderService.findByGps(req.user.id);
  }

  /**
   * @swagger
   *
   * /order:
   *   post:
   *     tags:
   *       - order
   *     description: Add new order
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           $ref: '#/definitions/Order'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Post('')
  async create(@Body() data: any, @Req() req): Promise<any> {
    return this.orderService.create(data, req.user);
  }

  /**
   * @swagger
   *
   * /order/{id}:
   *   get:
   *     tags:
   *       - order
   *     description: Get order
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Get(':id')
  async getOrder(@Param() params: FindOneOrder, @Req() req): Promise<any> {
    return this.orderService.getById(params.id);
  }

  /**
   * @swagger
   *
   * /order/{id}/accept:
   *   post:
   *     tags:
   *       - order
   *     description: Accept order
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Post(':id/accept')
  async accept(@Param() params: FindOneOrder, @Req() req): Promise<any> {
    return this.orderService.accept(params.id, req.user.id);
  }

  /**
   * @swagger
   *
   * /order/{id}:
   *   put:
   *     tags:
   *       - order
   *     description: Update order
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id
   *         required: true
   *         type: integer
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *          type: object
   *          $ref: '#/definitions/Order'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Put(':id')
  async update(@Param() params: FindOneOrder, @Body() data: any, @Req() req): Promise<any> {
    data.id = Number(params.id);
    return this.orderService.update(data, req.user);
  }

  /**
   * @swagger
   *
   * /order/{id}:
   *   delete:
   *     tags:
   *       - order
   *     description: Delete order
   *     parameters:
   *       - name: id
   *         in: path
   *         description: id
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Delete(':id')
  async delete(@Param() params: FindOneOrder): Promise<any> {
    return this.orderService.delete(params.id);
  }
}
