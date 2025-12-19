import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense'
}
@Schema({ timestamps: true })
export class Transaction {
    @Prop()
    description: string;

    @Prop()
    amount: number;

    @Prop({ enum: TransactionType })
    type: TransactionType;

    @Prop({ default: Date.now })
    date: Date;

    @Prop()
    category: string;

    @Prop({ default: null })
    deleteAt : Date;

}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);