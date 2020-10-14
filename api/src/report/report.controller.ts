import { Controller, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { FindOneOrder } from 'src/orders/order.dto';
import { AuthGuard } from "../auth/auth.guard";
import { ReportService } from './report.service';

@Controller('order')
@UseGuards(new AuthGuard())
export class ReportController {
  constructor(private reportService: ReportService) {
  }

  /**
   * @swagger
   *
   * /order/{id}/report:
   *   post:
   *     tags:
   *       - order
   *     description: Add new report
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
   *           type: object
   *           $ref: '#/definitions/Report'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   *     security:
   *       - bearer: []
   */
  @Post(':id/report')
  async createReport(@Param() params: FindOneOrder, @Req() req): Promise<any> {

    return this.reportService.create(params.id, req.body);
  }

  /**
   * @swagger
   *
   * /order/{id}/thanks:
   *   put:
   *     tags:
   *       - order
   *     description: Update user score points
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
  @Put(':id/thanks')
  async updateUserPoints(@Param() params: FindOneOrder, @Req() req): Promise<any> {
    return this.reportService.updatePoints(params.id);
  }
}


