import React from 'react'

const User = ({user}) => {
    return (
                <tr>
                    <td>{user['Account No.']}</td>
                    <td>{user['Account Name']}</td>
                    <td>{user['Balance']}</td>
                </tr>
    )
}

export default User
