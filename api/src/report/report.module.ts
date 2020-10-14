import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportRepository } from './report.repository';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { OrderRepository } from 'src/orders/orders.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, ReportRepository, UserRepository]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {
}
