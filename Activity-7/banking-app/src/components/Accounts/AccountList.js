import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Account from './Account'
import Transaction from '../Transactions/Transaction'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';

const AccountList = () => {
    //modal display states
    const [show, setShow] = useState(false);

    //account data states
    const [accts, setAccts] = useState([]);
    const [acctNum, setAcctNum] = useState('');
    const [bal, setBal] = useState(0);
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
        // alert('Account Created Sucessfully!');
    }

    class TransactionClass {
        constructor(transactionId, transactionDate, transactionFromAcctNum, transactionToAcctNum, transactionType, transactionAmt) {
            this.transactionId = transactionId;
            this.transactionDate = transactionDate;
            this.transactionFromAcctNum = transactionFromAcctNum;
            this.transactionToAcctNum = transactionToAcctNum;
            this.transactionType = transactionType;
            this.transactionAmt = transactionAmt;
        }
    }

    //Function to withdraw
    const handleWithdraw = () => {
        const acct = accts.find(user => {return user["Account No."] === fromAcctNum})
        if(acct) {
            if(acct["Balance"]>= withdrawAmt) {
                var newBal = acct["Balance"] - withdrawAmt;
                setAccts([...accts], acct["Balance"] = newBal);
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
        const acct = accts.find(user => {return user["Account No."] === fromAcctNum})
        if(acct) {
                var newBal = acct["Balance"] - (-depositAmt);
                setAccts([...accts], acct["Balance"] = newBal)
                var date = generateDate();
                var newTransaction = new TransactionClass(uuidv4(), date, fromAcctNum, null, "Deposit", depositAmt);
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
        const fromAcct = accts.find(user => {return user["Account No."] === fromAcctNum})
        const toAcct = accts.find(user => {return user["Account No."] === toAcctNum})
        if(fromAcct && toAcct) {
            if(fromAcct["Balance"]>= transferAmt) {
                var newBalFromAcct = fromAcct["Balance"] - transferAmt;
                setAccts([...accts], fromAcct["Balance"] = newBalFromAcct)
                var newBalToAcct = toAcct["Balance"] - (-transferAmt);
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


    return (
        <div>
            {/* Add Account Holder Button */}
            <Button variant="primary"  onClick={handleShow}>Add Account Holder</Button>

            {/* Accounts List Table */}
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

            {/*Add Account Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Create New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="register">
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
                            <Form.Control type="number" placeholder="0" ref={initBalRef}  onChange={(e) => setBal(e.target.value)} onKeyPress={handleRegKeypress}/>
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

            {/* Withdraw Form */}
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="0" onChange={(e) => setWithdrawAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleWithdraw}>
                    Withdraw
                </Button>
            </div>

            {/* Deposit Form */}
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="0" onChange={(e) => setDepositAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleDeposit}>
                    Deposit
                </Button>
            </div>

            {/* Transfer Form */}
            <div>
                <Form>
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
                        <Form.Control type="number" placeholder="0" onChange={(e) => setTransferAmt(e.target.value)}/>
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

export default AccountList
