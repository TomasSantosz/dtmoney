import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';


interface TransactionsProviderProps{
    children: ReactNode;
}
interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createAt: string;
}
type TransactionInput = Omit<Transaction, 'id' | 'createAt'>;

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
/* interface TransactionInput{
    title: string;
    amount: number;
    type: string;
    category: string;
} */
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;
const TransactionsContex = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
        const response = await api.post('transactions', {
            ...transactionInput,
            createAt: new Date(),
        });

        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ])
    }
    return (
        <TransactionsContex.Provider value={{ transactions, createTransaction}}>
            {children}
        </TransactionsContex.Provider>
    );
}

export function useTransactions(){
    const context = useContext(TransactionsContex);
    return context;
}