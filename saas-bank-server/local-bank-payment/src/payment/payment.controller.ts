import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './payment.entity';
import { WebhookDto } from './dto/webhook.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Process payment (main entry point)
  @Post('process')
  async processPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.processPayment(createPaymentDto);
    return { success: true, data: payment };
  }

  // Get a specific payment by ID
  @Get(':id')
  async getPayment(@Param('id') id: string): Promise<{ success: boolean; data: Payment }> {
    const payment = await this.paymentService.getPayment(Number(id));
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return { success: true, data: payment };
  }

  // Optional: you can remove this if not needed
  // @Post('initiate')
  // async initiate(@Body() dto: CreatePaymentDto) {
  //   const payment = await this.paymentService.processPayment(dto);
  //   return { success: true, data: payment };
  // }

  // Endpoint to receive webhooks from Equity API
  @Post('webhook')
  async webhook(@Body() payload: WebhookDto) {
    try {
      await this.paymentService.handleWebhook(Number(payload.paymentId), payload.status);
      return { success: true, message: 'Payment status updated successfully' };
    } catch (error) {
      console.error('Error processing webhook:', error);
      return { success: false, message: 'Error processing webhook', error: error.message };
    }
  }

  // Manual webhook simulation (useful for testing)
  @Post('webhook/:id')
  async simulateWebhook(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: string },
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.paymentService.handleWebhook(id, body.status);
      return { success: true, message: `Simulated webhook for payment ${id} with status '${body.status}'` };
    } catch (error) {
      console.error('Error in simulateWebhook:', error);
      return { success: false, message: 'Failed to simulate webhook'};
    }
  }
}
