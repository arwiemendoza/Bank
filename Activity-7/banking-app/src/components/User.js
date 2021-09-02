import React from 'react'
import Table from 'react-bootstrap/Table';

const User = ({user}) => {
    return (
                <tbody>
                    <td>{user['Account No.']}</td>
                    <td>{user['Account Name']}</td>
                    <td>{user['Balance']}</td>
                </tbody>
    )
}

export default User
