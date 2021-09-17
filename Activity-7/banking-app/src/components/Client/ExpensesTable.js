import React from 'react'
import Table from 'react-bootstrap/Table';
import Expenses from './Expenses'
import './client-css/dashboard.css'

const ExpensesTable = ({toggleCheck, expenses}) => {
    return (
        <div className="expense-table">
            <Table responsive className ="container expense-table">
                <thead>
                    <tr>
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
