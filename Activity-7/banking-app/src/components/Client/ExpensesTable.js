import React from 'react'
import Table from 'react-bootstrap/Table';
import Expenses from './Expenses'

const ExpensesTable = ({toggleCheck, expenses}) => {
    return (
        <div className="expense-table">
            <Table responsive className ="container">
                <thead>
                    <tr>
                    {/* <th></th> */}
                    <th>Expense Name</th>
                    <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => {
                        return <Expenses key={expense.id} toggleCheck={toggleCheck}  expense = {expense}/>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default ExpensesTable
