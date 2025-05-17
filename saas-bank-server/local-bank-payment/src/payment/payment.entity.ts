import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: string;

  @Column()
  accountName: string;

  @Column()
  phoneNumber: string;

  @Column('decimal')
  amount: number;

  @Column()
  transactionId: string;

  @Column()
  callbackUrl: string;

  @Column()
  bankCode: string;

  @Column({ nullable: true })
  reference?: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
