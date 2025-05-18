import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';


@Controller('api/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

 // payment.controller.ts
@Post("record")
async recordTransaction(@Body() dto: CreatePaymentDto) {
  return this.paymentService.record(dto);
}

}
