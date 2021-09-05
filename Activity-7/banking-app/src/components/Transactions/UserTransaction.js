import React from 'react'
import Transaction from '../Transactions/Transaction'

const UserTransaction = () => {
    return (
        <div>
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
    )
}

export default UserTransaction
