import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';


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


export const TransactionsContex = createContext<Transaction[]>([]);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(()=>{
        api.get('/transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    return (
        <TransactionsContex.Provider value={transactions}>
            {children}
        </TransactionsContex.Provider>
    );
}