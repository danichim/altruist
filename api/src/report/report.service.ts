import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Validator } from 'class-validator';
import { OrderRepository } from 'src/orders/orders.repository';
import { UserRepository } from 'src/user/user.repository';
import { Report } from './report.entity';
import { ReportRepository } from './report.repository';

@Injectable()
export class ReportService {
  constructor(
    private userRepository: UserRepository,
    private orderRepository: OrderRepository,
    private reportRepository: ReportRepository,
  ) {
  }

  async create(orderId: any, reportDTO: any): Promise<any> {
    const report = new Report();
    report.order = orderId

    const order = await this.orderRepository.findOne(orderId);
    report.subject = reportDTO.subject
    report.message = reportDTO.message

    const validator = new Validator();
    const errors = await validator.validate(report);

    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    await this.orderRepository.update(order.id, { status: "done" });
    const result = await this.reportRepository.save(report);
    return result
  }

  async updatePoints(orderId: any): Promise<any> {

    const order = await this.orderRepository.findOne(orderId);

    const validator = new Validator();
    const errors = await validator.equals(order.status, "done")
    if (errors) {
      throw new HttpException([
        {
          "property": "order",
          "constraints": {
            "OrderAlreadyCompleteValidator": `Order has already been completed.`
          }
        }], HttpStatus.BAD_REQUEST);
    }

    await this.orderRepository.update(order.id, { status: "done" });
    const user = await this.userRepository.findOne(order.accepted_by);
    const result = await this.userRepository.update(user.id, { points: user.points + 1 });
    return result
  }
}
