import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './schema/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  
  constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    ) {}

  
  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const createdTransaction = new this.transactionModel(createTransactionDto);
        return createdTransaction.save();
  }

  async findAll(type: string, category: string) : Promise<Transaction[]> {
    const Filter : any = { deleteAt : null};
    if (type){
      Filter.type = type;
    }
    if (category){
      Filter.category = category;
    }

    return this.transactionModel.find(Filter).exec();
  }

  async  findOneTransaction(id: string) : Promise<Transaction> {
    const Onetransaction = await this.transactionModel.findOne({ _id : id , deleteAt : null }).exec();
    if (!Onetransaction) {
      throw new Error('Transaction not found');
    }
    return Onetransaction;
  }

  async update(id: string, updateData: UpdateTransactionDto) : Promise<Transaction> {
    const updatedTransaction = await this.transactionModel.findOneAndUpdate(
      { _id: id, deleteAt: null },
      updateData,
      { new: true },
    ).exec();

    if (!updatedTransaction) {
      throw new Error('Transaction not found');
    }
    return updatedTransaction;
  }

  async remove(id: string) : Promise<void> {
    const remove = await this.transactionModel.updateOne({ _id: id }, { deleteAt: new Date() }).exec();
    if (remove.matchedCount === 0) {
      throw new Error('Transaction not found');
    }
  }

  async restoreData(id: string) : Promise<void> {
    const restore = await this.transactionModel.updateOne({ _id: id }, { deleteAt: null }).exec();
    if (restore.matchedCount === 0) {
      throw new Error('Transaction not found');
    }
  }
}
