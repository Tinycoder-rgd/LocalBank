// src/payment/dto/webhook.dto.ts
export class WebhookDto {
  paymentId: string;  // The ID of the payment from your DB
  status: 'success' | 'failed';  // The status sent from Equity
  reference: string;  // The reference provided by the bank for the payment
  amount: number;  // Amount processed
  bankTransactionId: string;  // Transaction ID from Equity Bank
}
