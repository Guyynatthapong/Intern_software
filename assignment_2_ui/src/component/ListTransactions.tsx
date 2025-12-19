
export type TransactionItem = {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  description: string;
  date: string;
};


interface TransactionListProps {
  datalist: TransactionItem[];
}

const ListTransactions = ({ datalist } : TransactionListProps) => {

    const FormatDate = (date : string) => {
        return new Date(date).toLocaleDateString('th-TH', 
            {day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    return (
        <div className="font-mali p-6 w-full h-[800px] flex flex-col">
            <h2 className="text-lg text-center font-bold text-gray-800 mb-4 pb-2">
                ประวัติการทำรายการ ({datalist.length})
            </h2>
            <div className="flex flex-col gap-3">
                {datalist.map((transactions) => {
                        const isIncome = transactions.type === 'income';
                        return (
                            <div 
                                key={transactions.id} 
                                className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg  border border-gray-100"
                            >
                                <div className="flex flex-col ">
                                    <span className="font-medium text-gray-700">{transactions.description}</span>
                                    <span className="text-xs text-gray-400">
                                    {FormatDate(transactions.date)}
                                    </span>
                                </div>

                                <div className={`text-lg font-bold ${isIncome ? 'text-green-600' : 'text-red-500'}`}>
                                    {isIncome ? '+' : '-'} {transactions.amount.toLocaleString()}
                                </div>
                            </div>
                        );

                    })
                    }
            </div>
        </div>
    );
       
       

}


export default ListTransactions;