import React, {useEffect, useState} from 'react'
import Dinero from '../../../node_modules/dinero.js'

const Account = ({acct, emailDisplay, toggleCheck}) => {
    let acctBal = Dinero({ amount: parseInt(acct["Balance"] * 100), currency: 'PHP' }).toFormat()

    function handleClick() {
        toggleCheck(acct.id)
    }

    return (
                <tr>
                    <td><input type="checkbox" defaultChecked={acct.ticked} onChange={handleClick}/></td>
                    <td>{acct.id}</td>
                    <td>{acct['Account Name']}</td>
                    {emailDisplay && <td>{acct['Email']}</td>}
                    <td>{acctBal}</td>
                    {/* {emailDisplay && <td id="edit">E</td>} */}
                    {/* {emailDisplay && <td id="delete"><button onClick={handleDelete(acct.id)}></button></td>} */}
                </tr>
    )
}

export default Account
