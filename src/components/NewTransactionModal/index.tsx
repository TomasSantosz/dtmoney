import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import { FormEvent, useState} from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
export function NewTransactionModal({ isOpen, onRequestClose}: NewTransactionModalProps){
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })
        setTitle('');
        setAmount(0);
        setType('deposit');
        setCategory('');
        onRequestClose();
    }

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onRequestClose}  
            overlayClassName="react-modal-overlay"  
            className='react-modal-content'
        >
            <button type='button' onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt='fechar modal' />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input 
                    placeholder='Título'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <input 
                    placeholder='Valor' 
                    type='number'
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                />
                
                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={()=>{ setType('deposit')}}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type='button'
                        onClick={()=>{ setType('withdraw')}}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder='Categoria'
                    value={category}
                    onChange={e => setCategory(e.target.value)}    
                />
                <button type='submit'>
                    Cadastrar
                </button>
            </Container>
            
        </Modal>
    )
}