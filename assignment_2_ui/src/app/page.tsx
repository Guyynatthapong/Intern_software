"use client";

import ListTransactions, {TransactionItem} from "../component/ListTransactions";
import SummaryCard, {FilterType} from "../component/SummaryCard";
import { useState } from "react";


const mockData = {
  "transactions": [
    { "id": "1", "type": "expense", "amount": 45, "description": "กาแฟเย็น Cafe Amazon", "date": "2024-01-15T08:30:00Z" },
    { "id": "2", "type": "expense", "amount": 350, "description": "เติมน้ำมัน", "date": "2024-01-15T12:00:00Z" },
    { "id": "3", "type": "income", "amount": 25000, "description": "เงินเดือน", "date": "2024-01-01T00:00:00Z" },
    { "id": "4", "type": "expense", "amount": 1500, "description": "ค่าไฟฟ้า", "date": "2024-01-10T00:00:00Z" },
    { "id": "5", "type": "expense", "amount": 200, "description": "Netflix", "date": "2024-01-05T00:00:00Z" },
    { "id": "6", "type": "expense", "amount": 1200, "description": "เสื้อยืด Uniqlo", "date": "2024-01-03T15:45:00Z" },
    { "id": "7", "type": "expense", "amount": 80, "description": "ข้าวมันไก่", "date": "2024-01-14T12:30:00Z" },
    { "id": "8", "type": "income", "amount": 500, "description": "ขายของมือสอง", "date": "2024-01-08T10:00:00Z" },
    { "id": "9", "type": "expense", "amount": 890, "description": "ยาแก้หวัด + หมอ", "date": "2024-01-12T10:30:00Z" },
    { "id": "10", "type": "expense", "amount": 65, "description": "ส้มตำ + ไก่ย่าง", "date": "2024-01-11T18:00:00Z" }
  ]
}


export default function DashboardPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  const transactions = mockData.transactions as TransactionItem[];

  const Summarytransactions = (type: 'income' | 'expense') => {
    return transactions.filter( (typeTrans) => typeTrans.type === type).reduce((sum, typeTrans) => sum + typeTrans.amount, 0);
  }
  const totalIncome = Summarytransactions('income');
  const totalExpense = Summarytransactions('expense');
  const balance = totalIncome - totalExpense;
  
  const Filterchangelist = () => {
    if (filter === 'all') {
      return transactions;
    } else {
      return transactions.filter( (typeTrans) => typeTrans.type === filter);
    }
  }

  const transactionsFiltered = Filterchangelist();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <SummaryCard 
          totalincome = {totalIncome}
          totalexpense = {totalExpense}
          balance = {balance}
          currentFilter={filter}
          onFilterChange={(newFilter) => setFilter(newFilter)}
        />
        
        <ListTransactions 
          datalist={transactionsFiltered}
        />
      </main> 
    </div>
  );
}
