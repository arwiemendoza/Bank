import React from 'react'
import Dinero from '../../../node_modules/dinero.js'

const Expenses = ({toggleCheck, expense}) => {
    let expenseCost = Dinero({ amount: parseInt(expense.expenseCost * 100), currency: 'PHP' }).toFormat()

    return (
            <tr>
                {/* <td><input type="checkbox" defaultChecked={expense.ticked} onChange={handleClick}/></td> */}
                <td>{expense.expenseName}</td>
                <td>{expenseCost}</td>
            </tr>
    )
}

export default Expenses
