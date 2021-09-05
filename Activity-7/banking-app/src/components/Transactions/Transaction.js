import React from 'react'
import Dinero from '../../../node_modules/dinero.js'

const User = ({transaction}) => {
    let formattedAmt = Dinero({ amount: parseInt(transaction.transactionAmt * 100), currency: 'PHP' }).toFormat()
    return (
                <tr>
                    <td>{transaction.transactionDate}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.transactionFromAcctNum}</td>
                    <td>{transaction.transactionToAcctNum}</td>
                    <td>{formattedAmt}</td>
                </tr>
    )
}

export default User
