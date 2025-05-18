import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankName: string;

  @Column()
  account: string;

  @Column()
  amount: string;

  @CreateDateColumn()
  createdAt: Date;
}
