import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Account from './Account'
import Transaction from '../Transactions/Transaction'
import { v4 as uuidv4 } from 'uuid';
import '../../css/Account.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, withRouter } from "react-router-dom";

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';

const AccountList = (props) => {
    //modal display states
    const [show, setShow] = useState(false);

    //account data states
    const [accts, setAccts] = useState([]);
    const [acctNum, setAcctNum] = useState('');
    const [bal, setBal] = useState('');
    const [acctName, setAcctName] = useState('');
    const [acctEmail, setAcctEmail] = useState('');
    const [pword, setPword] = useState('');
    //transaction states
    const [fromAcctNum, setFromAcctNum] = useState('');
    const [toAcctNum, setToAcctNum] = useState('');
    const [withdrawAmt, setWithdrawAmt] = useState(0);
    const [depositAmt, setDepositAmt] = useState(0);
    const [transferAmt, setTransferAmt] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const addButton = "{+}";
    
    // functions for modal
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        generateAcctNum()
    };
  
    // input reference
    const acctNameRef = useRef();
    const acctEmailRef = useRef();
    const insecurePwordRef = useRef();
    const initBalRef = useRef();

    // on mount, will load existing accounts and transactions
    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAccts(storedAccts);
        const storedTransactions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_2));
        if (storedTransactions) setTransactionHistory(storedTransactions);
    }, [])

    // on add new account, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
    }, [accts])

    // on new transactions, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_2, JSON.stringify(transactionHistory));
    }, [transactionHistory])

    // Account number generator
    const generateAcctNum = () => {
        let date = new Date();
        let min = (date.getMinutes()).toString().substr(-2);
        setAcctNum(Math.floor(Math.random() * 90) + min)
    }

    // Date and Time generator
    const generateDate = () => {
        var date = '';
        //Date
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var day = currentDate.getDate();
        var month = currentDate.getMonth();
        var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // Time
        var currentTime = new Date();
        var h = currentTime.getHours();
        var m = currentTime.getMinutes();
        var partOfDay;
        if (h < 12) {
            partOfDay = "AM";
        }
        else {
            partOfDay = "PM";
        }
        if (h > 12) {
            h = h - 12;
        }
        if (h === 24) {
            h = 12;
        }
        if (m < 10) {
            m = "0" + m;
        }

        // Add to variable
        date = `${monthArray[month]} ${day} ${year} ${h}:${m} ${partOfDay}`;

        return date;
    }

    // Function for account creation
    const handleCreateAcct = () => {
        setShow(false)

        console.log(bal)

        const newAcct = {
            'Account No.': acctNum, 
            'Account Name': acctName, 
            'Email': acctEmail, 
            'Password': pword, 
            'Balance': bal
        }

        //add new user to previous set of users using spread operator for previous data 
        setAccts(prevAccts => {
            return [...prevAccts, newAcct]
        })
        
        setAcctName('');
        setBal('');
        setAcctEmail('');
        setPword('');
    }

    class TransactionClass {
        constructor(transactionId, transactionDate, transactionFromAcctNum, transactionToAcctNum, transactionType, transactionAmt) {
            this.transactionId = transactionId;
            this.transactionDate = transactionDate;
            this.transactionFromAcctNum = transactionFromAcctNum;
            this.transactionToAcctNum = transactionToAcctNum;
            this.transactionType = transactionType;
            this.transactionAmt = transactionAmt
        }
    }

    //Function to withdraw
    const handleWithdraw = () => {
        const fromAcct = accts.find(acct => {return acct["Account No."] === fromAcctNum})
        if(fromAcct) {
            if(fromAcct["Balance"]>= parseInt(withdrawAmt*100)/100) {
                var newBal = (fromAcct["Balance"]*100 - withdrawAmt*100)/100;
                setAccts([...accts], fromAcct["Balance"] = newBal);
                var date = generateDate();
                var newTransaction = new TransactionClass(uuidv4(), date, fromAcctNum, null, "Withdraw", withdrawAmt);
                setTransactionHistory(prevTransactions => {
                    return [...prevTransactions, newTransaction]
                })
            }
            else {
                alert('Insufficient Funds')
            }
        }
        else {
            alert('Account does not exist')
        }
    }

    //Function to deposit
    const handleDeposit = () => {
        const fromAcct = accts.find(acct => {return acct["Account No."] === fromAcctNum})
        if(fromAcct) {
                var newBal = (fromAcct["Balance"]*100 - (-depositAmt)*100)/100;
                setAccts([...accts], fromAcct["Balance"] = newBal)
                var date = generateDate();
                var newTransaction = new TransactionClass(uuidv4(), date, null, fromAcctNum, "Deposit", depositAmt);
                setTransactionHistory(prevTransactions => {
                    return [...prevTransactions, newTransaction]
                })
        }
        else {
            alert('Account does not exist')
        }
    }

    //Function to transfer
    const handleTransfer = () => {
        const fromAcct = accts.find(acct => {return acct["Account No."] === fromAcctNum})
        const toAcct = accts.find(acct => {return acct["Account No."] === toAcctNum})
        if(fromAcct && toAcct) {
            if(fromAcct["Balance"]>= parseInt(transferAmt*100)/100) {
                var newBalFromAcct = (fromAcct["Balance"]*100 - transferAmt*100)/100;
                setAccts([...accts], fromAcct["Balance"] = newBalFromAcct)
                var newBalToAcct = (toAcct["Balance"]*100 - (-transferAmt)*100)/100
                setAccts([...accts], toAcct["Balance"] = newBalToAcct)
                var date = generateDate();
                var newTransaction = new TransactionClass(uuidv4(), date, fromAcctNum, toAcctNum, "Transfer", transferAmt);
                setTransactionHistory(prevTransactions => {
                    return [...prevTransactions, newTransaction]
                })
            }
            else {
                alert('Insufficient Funds')
            }
        }
        else if (!fromAcct) {
            alert('Sending Account does not exist')
        }
        else {
            alert('Receiving Account does not exist')
        }
    }

    const handleRegKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.code === 'Enter') {
            handleCreateAcct();
        }
    };

    // disable changing of number values via mousewheel
    var numberInput;
    useEffect(() => {
            numberInput = document.querySelectorAll('.number-input');
            numberInput.forEach(input => {
                input.addEventListener("mousewheel", 
                    function(event){ 
                        this.blur() 
                    }
                );
            })
    }, [])

    //limit to 2 decimal places onInput
    const validate = (e) => {
        e.target.value = (e.target.value.indexOf(".") >= 0) ? (e.target.value.substr(0, e.target.value.indexOf(".")) + e.target.value.substr(e.target.value.indexOf("."), 3)) : e.target.value;
    }

    return (

        <div className="accountList">
            <Dropdown className="d-inline-block">
                <Dropdown.Toggle id="buttondrop" className= 'e-caret-hide' caret></Dropdown.Toggle>
            <Dropdown.Menu>
            <span>Transactions</span>

            <Dropdown.Item>
                <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                    <Link class="nav-link" to="/">
                    Withdraw
                    <span class="sr-only"></span>
                    </Link>
                </li>
            </Dropdown.Item>
                    
            <Dropdown.Item>
                <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                    <Link class="nav-link" to="/">
                    Deposit
                    <span class="sr-only"></span>
                    </Link>
                </li>
            </Dropdown.Item>

            <Dropdown.Item>
                <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                    <Link class="nav-link" to="/">
                    Transfer
                    <span class="sr-only"></span>
                    </Link>
                </li>
            </Dropdown.Item>

            <Dropdown.Item>
                <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                    <Link class="nav-link" to="/">
                    Transaction List
                    <span class="sr-only"></span>
                    </Link>
                </li>
            </Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>


            {/* Withdraw Form */}
            <div className="transact-parent">
                <Form className="form-class">
                    <Form.Group className="mb-3">
                        <Form.Label>Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control className="number-input" type="number" placeholder="0" onInput={validate} onChange={(e) => setWithdrawAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleWithdraw}>
                    Withdraw
                </Button>
            </div>
            {/* Add Account Holder Button */}
            <Button variant="primary" id="createAccount" onClick={handleShow}>{addButton}</Button>

            {/* Accounts List Table */}
            <div className="table-container">
                
                    <Table responsive className ="container" id="userTable">
                        <thead>
                            <tr>
                            <th>Account No.</th>
                            <th>Account Name</th>
                            <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accts.map(acct => {
                                return <Account key={acct['Account No.']} acct = {acct}/>
                            })}
                        </tbody>
                    </Table>
            </div>

            {/*Add Account Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Create New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="register2">
                        <Form.Group className="mb-3">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" ref={acctNameRef} id="name_input" onChange={(e) => setAcctName(e.target.value)} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" ref={acctEmailRef} onChange={(e) => setAcctEmail(e.target.value)} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="********" ref={insecurePwordRef}  onChange={(e) => setPword(e.target.value)} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Initial Balance</Form.Label>
                            <Form.Control className="number-input" type="number" placeholder="0" ref={initBalRef}  onChange={(e) => setBal(e.target.value)} onInput={validate} onKeyPress={handleRegKeypress}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleCreateAcct}>
                    Create Account
                </Button>
                </Modal.Footer>
            </Modal>

            

            {/* Deposit Form */}
            <div className="transact-parent">
                <Form className="form-class">
                    <Form.Group className="mb-3">
                        <Form.Label>Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control className="number-input" type="number" placeholder="0" onInput={validate} onChange={(e) => setDepositAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleDeposit}>
                    Deposit
                </Button>
            </div>

            {/* Transfer Form */}
            <div className="transact-parent">
                <Form className="form-class">
                    <Form.Group className="mb-3">
                        <Form.Label>Sender Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Receiver Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setToAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control className="number-input" type="number" placeholder="0" onInput={validate} onChange={(e) => setTransferAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleTransfer}>
                    Transfer
                </Button>
            </div>

            {/* Transactions Table */}
            <Table responsive className ="container" id="transactionTable">
                <thead>
                    <tr>
                    <th>Transaction Date</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionHistory.map(transaction => {
                        return <Transaction key={transaction.transactionId} transaction = {transaction}/>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default withRouter(AccountList);
