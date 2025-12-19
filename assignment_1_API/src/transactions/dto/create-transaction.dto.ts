
import { IsEnum, IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';
import { TransactionType } from '../schema/transaction.schema';

export class CreateTransactionDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsDateString()
  date: Date;
}