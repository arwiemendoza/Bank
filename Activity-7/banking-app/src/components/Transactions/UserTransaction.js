import React from 'react'
import Withdraw from './components/Transactions/Withdraw'
import Deposit from './components/Transactions/Deposit'
import Transfer from './components/Transactions/Transfer'

const UserTransaction = () => {
    return (
        <div>
            <Withdraw />
            <Deposit />
            <Transfer />
        </div>
    )
}

export default UserTransaction
