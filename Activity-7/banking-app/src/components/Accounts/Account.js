import React from 'react'
import Dinero from '../../../node_modules/dinero.js'

const Account = ({acct}) => {
    let acctBal = Dinero({ amount: parseInt(acct["Balance"] * 100), currency: 'PHP' }).toFormat()
    return (
                <tr>
                    <td>{acct['Account No.']}</td>
                    <td>{acct['Account Name']}</td>
                    <td>{acctBal}</td>
                </tr>
    )
}

export default Account
