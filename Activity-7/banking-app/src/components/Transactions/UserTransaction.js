import React, {useState, useEffect} from 'react'
import Transaction from './Transaction'
import Table from 'react-bootstrap/Table';
// import { useLocation } from "react-router-dom";
import '../../css/TransactionHistory.css'

const LOCAL_STORAGE_KEY_2 = 'transactionList';

const UserTransaction = () => {    
    // const location = useLocation();
    // const {transactionHistoryProp} = location.state
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_2));
        if (storedTransactions) setTransactionHistory(storedTransactions);
    }, [])

    return (
        <div className="transactionList">
            <h1 className="glitch" data-text="Transaction History"> Transaction History </h1>
            
            {/* Transactions Table */}
            <Table responsive className ="container" id="transactionTable">
                <thead>
                    <tr>
                    <th>Transaction Date</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {transactionHistoryProp.map(transaction => {
                        return <Transaction key={transaction.transactionId} transaction = {transaction}/>
                    })} */}
                    {transactionHistory.map(transaction => {
                        return <Transaction key={transaction.transactionId} transaction = {transaction}/>
                    })}
                </tbody>
            </Table>

        </div>
    )
}

export default UserTransaction
