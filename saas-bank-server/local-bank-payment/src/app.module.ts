import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'MyStrongP@ssw0rd123', // use the actual password you set
      database: 'saas_bank_db',
      entities: [Payment],
      synchronize: true, // ⚠️ use true only in dev
    }),
    PaymentModule,
  ],
})
export class AppModule {}
