import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  private readonly clientId = 'YOUR_JENGA_CLIENT_ID';
  private readonly clientSecret = 'YOUR_JENGA_CLIENT_SECRET';

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly httpService: HttpService,
  ) {}

  private async getAccessToken(): Promise<string> {
    const authHeader = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');

    const response = await lastValueFrom(
      this.httpService.post(
        'https://sandbox.jengahq.io/token',
        new URLSearchParams({ grant_type: 'client_credentials' }),
        {
          headers: {
            Authorization: `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
    );

    return response.data.access_token;
  }

  async processPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const accessToken = await this.getAccessToken();

    const payment = this.paymentRepository.create({
      accountNumber: createPaymentDto.accountNumber,
      accountName: createPaymentDto.accountName,
      phoneNumber: createPaymentDto.phoneNumber,
      amount: createPaymentDto.amount,
      transactionId: createPaymentDto.transactionId,
      callbackUrl: createPaymentDto.callbackUrl,
      bankCode: createPaymentDto.bankCode,
      status: 'PENDING',
      createdAt: new Date(),
    });

    await this.paymentRepository.save(payment);

    const payload = {
      payee: {
        name: createPaymentDto.accountName,
        accountNumber: createPaymentDto.accountNumber,
        bankCode: createPaymentDto.bankCode,
      },
      payer: {
        accountNumber: '1234567890', // Replace with your merchant account number
        bankCode: '01',             // Replace with your merchant bank code
      },
      amount: {
        currencyCode: 'KES',
        value: createPaymentDto.amount,
      },
      reference: `Ref-${Date.now()}`,
      description: 'Payment from platform',
      callbackUrl: createPaymentDto.callbackUrl,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          'https://sandbox.jengahq.io/v3-merchant/transaction-api/v3/transaction/payment',
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );

      payment.status = 'INITIATED';
      payment.reference = response.data.referenceNumber || payload.reference;

      await this.paymentRepository.save(payment);

      return payment;
    } catch (error) {
      payment.status = 'FAILED';
      await this.paymentRepository.save(payment);
      throw new HttpException('Payment failed with Jenga API', 500);
    }
  }

  async getPayment(id: number): Promise<Payment | null> {
    return this.paymentRepository.findOneBy({ id });
  }

  async handleWebhook(paymentId: number, status: string): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({ id: paymentId });
    if (payment) {
      payment.status = status;
      await this.paymentRepository.save(payment);
    }
  }

  // Optional: Simple create method to just store a payment record without calling external API
 async create(dto: CreatePaymentDto): Promise<Payment> {
  const payment = this.paymentRepository.create({
    accountNumber: dto.accountNumber,
    accountName: dto.accountName,
    phoneNumber: dto.phoneNumber,
    amount: dto.amount,
    transactionId: dto.transactionId,
    callbackUrl: dto.callbackUrl,
    bankCode: dto.bankCode,
    status: 'PENDING',
    createdAt: new Date(),
  });

  return await this.paymentRepository.save(payment);
}
}
