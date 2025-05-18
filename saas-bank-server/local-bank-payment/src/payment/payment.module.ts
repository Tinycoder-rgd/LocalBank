import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios'; // <-- Add this

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), HttpModule], // <-- Include here
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
