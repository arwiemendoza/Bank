import React from 'react'

const User = ({transaction}) => {
    return (
                <tr>
                    <td>{transaction.transactionDate}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.transactionFromAcctNum}</td>
                    <td>{transaction.transactionToAcctNum}</td>
                    <td>{transaction.transactionAmt}</td>
                </tr>
    )
}

export default User
