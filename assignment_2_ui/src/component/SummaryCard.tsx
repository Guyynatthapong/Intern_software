import React from "react";
import { BanknoteArrowUp, BanknoteArrowDown, Banknote } from 'lucide-react';

export type FilterType = 'all' | 'income' | 'expense';

interface SummaryCardProps {
    totalincome : number;
    totalexpense : number;
    balance : number;
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

const SummaryCard = ({totalincome, totalexpense, balance, currentFilter, onFilterChange} : SummaryCardProps)=> {
    
    return (
        <div className="grid grid-cols-1 gap-4 mb-8 w-full">
            <div 
                onClick={() => onFilterChange('all')}
                className={`p-8 cursor-pointer transition-colors hover:bg-gray-50 
                ${currentFilter === 'all' 
                    ? `border-3 rounded-[10] ${balance < 0 ? 'bg-red-50 border-[#D64286]' : 'bg-green-50 border-green-500'}` 
                    : 'border-b border-gray-100'
                }`}
            >
                <p className="text-gray-500 text-center font-bold text-2xl mb-2">ยอดเงินคงเหลือ </p>
                <h1 className={`flex gap-3 text-center items-center justify-center text-3xl font-bold ${balance < 0 ? 'text-[#D64286]' : 'text-green-600'}`}>
                    <Banknote size={36} /> {balance.toLocaleString()}
                </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 ">
                <div 
                    onClick={() => onFilterChange('income')}
                    className={`p-6 text-center cursor-pointer transition-colors hover:bg-green-50 w-full
                        ${currentFilter === 'income' ? 'bg-green-50 border-3 rounded-[10] border-green-500' : ''}`}
                >
                    <h3 className="flex gap-3 text-gray-500 text-sm font-medium"> <BanknoteArrowUp/> รายรับรวม (Income)</h3>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                        ฿ {totalincome}
                    </p>
                </div>

                <div 
                    onClick={() => onFilterChange('expense')}
                    className={`p-6 text-center cursor-pointer transition-colors hover:bg-red-50 w-full
                        ${currentFilter === 'expense' ? 'bg-red-50 border-3 rounded-[10] border-[#D64286]' : ''}`}
                >
                    <h3 className="flex gap-3 text-gray-500 text-sm font-medium"> <BanknoteArrowDown/> รายจ่ายรวม (Expense)</h3>
                    <p className="text-2xl font-bold text-[#D64286] mt-2">
                        ฿ {totalexpense}
                    </p>
                </div> 
            </div>
        </div>
    );
}

export default SummaryCard;