import { EntityRepository, Repository } from 'typeorm';
import { Report } from './report.entity';


@EntityRepository(Report)
export class ReportRepository extends Repository<Report> {

  async findByOrderId(orderId: number): Promise<Report> {
    const order = await this.findOne({
      where: {
        order_id: orderId,
      },
    });
    return order
  }
}