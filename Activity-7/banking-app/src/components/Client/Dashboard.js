import React, {useState, useEffect, useRef} from 'react'
import './client-css/dashboard.css'
import { useLocation } from "react-router-dom";
import Dinero from '../../../node_modules/dinero.js'
import {Card, Modal, Button, Form} from 'react-bootstrap'
import ExpensesTable from './ExpensesTable'

const LOCAL_STORAGE_KEY_1 = 'userList';

const Dashboard = () => {   
    const location = useLocation();
    const {email} = location.state;
    const [accts, setAccts] = useState(JSON.parse(localStorage.getItem('userList')))
    const [clientDetails, setClientDetails] = useState(accts.find(acct => acct['Email'] === email));
    const [expenseName, setExpenseName] = useState('');
    const [expenseCost, setExpenseCost] = useState(0);
    const [show, setShow] = useState(false);
    const [indexClient] = useState(accts.findIndex(acct => acct['Email'] === email))

    const expenseNameRef = useRef()
    const expenseCostRef = useRef()

    // useEffect(() => {

    // })


    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleCreateExpense = (event) => {
            event.preventDefault();
            setShow(false);
            const newExpense = {
                id: clientDetails.expenses.length ? clientDetails.expenses[clientDetails.expenses.length-1].id+1 : 1, 
                expenseName: expenseName, 
                expenseCost: expenseCost,
                ticked: false
            }

            const copyClientDetails = clientDetails
            copyClientDetails.expenses.push(newExpense)
            copyClientDetails["Balance"] = copyClientDetails["Balance"] - expenseCost;
            setClientDetails(copyClientDetails)

            const newAcctList = accts
            newAcctList[indexClient] = copyClientDetails
            setAccts(newAcctList)
            localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
            
            setExpenseName('');
            setExpenseCost(0);
    }

    const handleDelete = (e) => {
        const newExpenses = [...clientDetails.expenses]
        const updatedExpenseList = newExpenses.filter(expense => !expense.ticked)
        const copyClientDetails = clientDetails;
        copyClientDetails.expenses = updatedExpenseList;
        setClientDetails(copyClientDetails)

        const newAcctList = accts
        newAcctList[indexClient] = copyClientDetails
        setAccts(newAcctList)
        localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
    }

    function toggleCheck(id) {
        const newExpense = [...clientDetails.expenses]
        const expense = newExpense.find(expense => expense.id === id)
        expense.ticked = !expense.ticked
        const copyClientDetails = clientDetails
        copyClientDetails.expenses = newExpense
        setClientDetails(copyClientDetails)
        console.log(newExpense)

        const newAcctList = accts
        newAcctList[indexClient] = copyClientDetails
        setAccts(newAcctList)
        localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
    }

    return (
        <div className="dashboard-container">
            <div className="client-parent">
                <Card className="client-bal">
                    {/* {email} */}
                    <h1>
                        {clientDetails["Balance"] && Dinero({ amount: parseInt(clientDetails["Balance"] * 100), currency: 'PHP' }).toFormat()}
                    </h1>
                    <div className="card-sub">
                        <div>
                            {clientDetails && clientDetails.id}
                        </div>
                        <div>
                            {clientDetails["Account Name"] && clientDetails["Account Name"]}
                        </div>
                    </div>
                </Card>

                <Card>
                    <ExpensesTable expenses={clientDetails.expenses} toggleCheck={toggleCheck}/>
                </Card>

                {/* <Button variant="primary" onClick = {handleDelete}>Delete Selected Expenses</Button> */}

                <Button variant="primary" onClick={handleShow}>Add Expense Item</Button>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateExpense} >       
                        <Form.Group className="mb-3">
                            <Form.Label>Account Holder Name:</Form.Label>
                            <Form.Control type="text" placeholder="Expense Name" required ref={expenseNameRef} onChange={(e) => setExpenseName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Expense Cost:</Form.Label>
                            <Form.Control min="0" type="number" placeholder="0" ref={expenseCostRef} onChange={(e) => setExpenseCost(e.target.value)}/>
                        </Form.Group>
                        {<Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>}
                        <Button type="submit" variant="primary">
                            Add
                        </Button> 
                    </Form>
                </Modal.Body>
            </Modal>

                {/* <div className="slider">                  
                    <div className="slides">
                        <div id="slide-1">
                            <div className="withdrawTitle">Withdraw</div>
                            <div className="withdrawFormContainer">
                                <form>
                                    <input type="number" ref={withdrawRef}></input>
                                </form>
                                <button></button>
                            </div>
                        </div>
                        <div id="slide-2">
                            <div className="depositTitle">Deposit</div>
                            <div className="depositFormContainer">
                                <form>
                                    <input type="number" ref={depositRef}></input>
                                </form>
                                <button></button>
                            </div>
                        </div>
                        <div id="slide-3">
                            <div  className="transferTitle">Transfer Funds</div>
                            <div className="transferFormContainer">
                                <form>
                                    <input type="number" ref={transferRef}></input>
                                </form>
                                <button></button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard
