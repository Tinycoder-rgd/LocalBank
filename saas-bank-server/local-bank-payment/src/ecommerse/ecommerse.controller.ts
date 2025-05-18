// ecommerce.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('ecommerce')
export class EcommerceController {
  @Get('amount')
  getAmount() {
    return { amount: 'KES 1,000' };
  }
}
