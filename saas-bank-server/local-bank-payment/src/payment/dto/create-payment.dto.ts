export class CreatePaymentDto {
  account: string;
  sort: string;
  ref: string;
  bank: string;
  amount: string;
  payee: string;
  status: string; // success | error | pending
}
