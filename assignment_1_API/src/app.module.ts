import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsModule } from './transactions/transactions.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/personal_finance', {
    }),
    TransactionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
