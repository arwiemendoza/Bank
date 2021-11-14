import React, {useState, useEffect, useRef} from 'react'
import './client-css/dashboard.css'
import { useLocation } from "react-router-dom";
import Dinero from '../../../node_modules/dinero.js'
import {Card, Modal, Button, Form} from 'react-bootstrap'
import ExpensesTable from './ExpensesTable'
import {Redirect} from "react-router-dom";

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
    const [loginState, setLoginState] = useState(true)
    const [withdrawAmt, setWithdrawAmt] = useState(0)
    const [depositAmt, setDepositAmt] = useState(0)
    const [transferAmt, setTransferAmt] = useState(0)
    const [toAcctNum, setToAcctNum] = useState(0)
    const [color, setColor] = useState('#FFFFFF')

    const expenseNameRef = useRef()
    const expenseCostRef = useRef()
    const withdrawAmtRef = useRef()
    const depositAmtRef = useRef()
    const transferAmtRef = useRef()
    const toAcctRef = useRef()
    const colorPickerRef = useRef()

    useEffect(() => {
        let dashboardContainer = document.querySelector('.dashboard-container');
        dashboardContainer.style.backgroundColor = color;
    }, [color])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };

    const handleCreateExpense = (event) => {
            event.preventDefault();
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
            expenseNameRef.current.value = null;
            expenseCostRef.current.value = null;
    }

    const handleWithdraw = (e) => {
        e.preventDefault();
        if(clientDetails["Balance"]>= parseInt(withdrawAmt*100)/100) {
            var newBal = (clientDetails["Balance"]*100 - withdrawAmt*100)/100;
            const copyClientDetails = clientDetails
            copyClientDetails["Balance"] = newBal;
            setClientDetails(copyClientDetails)

            const newAcctList = accts
            newAcctList[indexClient] = copyClientDetails
            setAccts(newAcctList)
            localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));

            setWithdrawAmt(0)
            withdrawAmtRef.current.value = null
        }
    }

    const handleDeposit = (e) => {
        e.preventDefault();
        var newBal = (clientDetails["Balance"]*100 - (-depositAmt)*100)/100;
        const copyClientDetails = clientDetails
        copyClientDetails["Balance"] = newBal;
        setClientDetails(copyClientDetails)

        const newAcctList = accts
        newAcctList[indexClient] = copyClientDetails
        setAccts(newAcctList)
        localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));

        setDepositAmt(0)
        depositAmtRef.current.value = null
    }

    const handleTransfer = (e) => {
        e.preventDefault();
        const toAcct = accts.find(acct => {return acct.id === toAcctNum})
        if(toAcct && clientDetails.id!==toAcct) {
            if(clientDetails["Balance"]>= parseInt(transferAmt*100)/100) {
                var newBal = (clientDetails["Balance"]*100 - transferAmt*100)/100;
                const copyClientDetails = clientDetails
                copyClientDetails["Balance"] = newBal;
                setClientDetails(copyClientDetails)

                const newAcctList = accts
                newAcctList[indexClient] = copyClientDetails
                setAccts(newAcctList)
                localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));

                var newBalToAcct = (toAcct["Balance"]*100 - (-transferAmt)*100)/100
                setAccts([...accts], toAcct["Balance"] = newBalToAcct)
                localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));

                setTransferAmt(0)
                setToAcctNum(0);
                transferAmtRef.current.value = null
                toAcctRef.current.value = null
            }
        }
    }

    const handleLogout = () => {
        setLoginState(false)
    }


    if(!loginState) {
        return (<Redirect to="/login" />);
    }
    else {
        return (
            <div className="dashboard-container">
                <div className="client-parent">
                    <div className="logout-container">
                        <Button variant="outline-secondary" size="sm" onClick={handleLogout}>Logout</Button>
                    </div>
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

                    <Button variant="primary" onClick={handleShow}>Expenses</Button>

                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                            Current Balance: {clientDetails["Balance"] && Dinero({ amount: parseInt(clientDetails["Balance"] * 100), currency: 'PHP' }).toFormat()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card>
                            <ExpensesTable expenses={clientDetails.expenses}/>
                        </Card>
                        <Form onSubmit={handleCreateExpense} >       
                            <Form.Group className="mb-3">
                                <Form.Label>Expense Item:</Form.Label>
                                <Form.Control required type="text" placeholder="Expense Name" required ref={expenseNameRef} onChange={(e) => setExpenseName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Expense Cost:</Form.Label>
                                <Form.Control required min="0" type="number" placeholder="0" ref={expenseCostRef} onChange={(e) => setExpenseCost(e.target.value)}/>
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

                    <div className="slider">                  
                        <div className="slides">
                            <div id="slide-1" className="slide">
                                <div className="transactionTitle">Withdraw</div>
                                <div className="withdrawFormContainer">
                                    <Form onSubmit={handleWithdraw} >       
                                        <Form.Group className="mb-3">
                                            <Form.Control required type="text" placeholder="Amount" ref={withdrawAmtRef} onChange={(e) => setWithdrawAmt(e.target.value)} />
                                        </Form.Group>
                                        <Button type="submit" variant="primary">
                                            Withdraw
                                        </Button> 
                                    </Form>
                                </div>
                            </div>
                            <div id="slide-2" className="slide">
                                <div className="transactionTitle">Deposit</div>
                                <div className="depositFormContainer">
                                    <Form onSubmit={handleDeposit} >       
                                        <Form.Group className="mb-3">
                                            <Form.Control required type="text" placeholder="Amount" ref={depositAmtRef} onChange={(e) => setDepositAmt(e.target.value)} />
                                        </Form.Group>
                                        <Button type="submit" variant="primary">
                                            Deposit
                                        </Button> 
                                    </Form>
                                </div>
                            </div>
                            <div id="slide-3" className="slide">
                                <div  className="transactionTitle">Transfer Funds</div>
                                <div className="transferFormContainer">
                                    <Form onSubmit={handleTransfer} >
                                        <Form.Group className="mb-3">
                                            <Form.Control required type="text" placeholder="Send to Account No." ref={toAcctRef} onChange={(e) => setToAcctNum(e.target.value)} />
                                        </Form.Group>       
                                        <Form.Group className="mb-3">
                                            <Form.Control required type="text" placeholder="Amount" ref={transferAmtRef} onChange={(e) => setTransferAmt(e.target.value)} />
                                        </Form.Group>
                                        <Button type="submit" variant="primary">
                                            Send
                                        </Button> 
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Form.Control
                        type="color"
                        id="colorPicker"
                        defaultValue="#FFFFFF"
                        title="Choose your color"
                        ref={colorPickerRef}
                        onChange={(e)=>setColor(e.target.value)}
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard
