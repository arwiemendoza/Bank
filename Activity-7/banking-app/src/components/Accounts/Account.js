import React, {useEffect, useState} from 'react'
import Dinero from '../../../node_modules/dinero.js'

const Account = ({acct, emailDisplay, handleDelete}) => {
    let acctBal = Dinero({ amount: parseInt(acct["Balance"] * 100), currency: 'PHP' }).toFormat()

    return (
                <tr>
                    <td>{acct['Account No.']}</td>
                    <td>{acct['Account Name']}</td>
                    {emailDisplay && <td>{acct['Email']}</td>}
                    <td>{acctBal}</td>
                    {emailDisplay && <td id="edit">E</td>}
                    {emailDisplay && <td id="delete"><button onClick={handleDelete}></button></td>}
                </tr>
    )
}

export default Account
