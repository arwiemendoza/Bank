import React from 'react'

const Account = ({acct}) => {
    return (
                <tr>
                    <td>{acct['Account No.']}</td>
                    <td>{acct['Account Name']}</td>
                    <td>{acct['Balance']}</td>
                </tr>
    )
}

export default Account
