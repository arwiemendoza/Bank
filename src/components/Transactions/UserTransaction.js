import React, {useState, useEffect} from 'react'
import Transaction from './Transaction'
import Table from 'react-bootstrap/Table';
import '../../css/Account.css'

const LOCAL_STORAGE_KEY_2 = 'transactionList';

const UserTransaction = () => {    
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_2));
        if (storedTransactions) setTransactionHistory(storedTransactions);
    }, [])

    return (
        <div className="accountList">
            <h1 className="glitch white-glitch" data-text="Transaction History">Transaction History</h1>
            <div className="table-container">
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
                        {transactionHistory.map(transaction => {
                            return <Transaction key={transaction.transactionId} transaction = {transaction}/>
                        })}
                    </tbody>
                </Table>

            </div>
        </div>
    )
}

export default UserTransaction
