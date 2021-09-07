import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Account from './Account'
import { v4 as uuidv4 } from 'uuid';
import '../../css/Account.css'

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';

const AccountList = (props) => {
    //modal display states
    const [show, setShow] = useState(false);

    const [validated, setValidated] = useState(false);

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

    // on modify account, will add to local storage
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

    var nameChecker;
    var emailChecker;
    var passwordChecker;

    // Function for error checking
    const handleErrors = (event) => {
        // nameChecker = false;
        // emailChecker = false;
        // passwordChecker = false;
        // var inputEmail = accts.find(acct => {return acct["Email"] === acctEmailRef.current.value})
        // if (!acctNameRef.current.value) {
        //     acctNameRef.current.style.borderColor = 'red'
        //     acctNameRef.current.focus()
        // }
        // else if (!isNaN(acctNameRef.current.value.substring(0, 1))) {
        //     acctNameRef.current.style.borderColor = 'red'
        // }
        // else {
        //     acctNameRef.current.style.borderColor = 'green'
        //     nameChecker = true;
        // }
        // if (!acctEmailRef.current.value) {
        //     acctEmailRef.current.style.borderColor = 'red'
        // }  
        // else if (acctEmailRef.current.value.indexOf('@') === -1){
        //     acctEmailRef.current.style.borderColor = 'red' 
        // } 
        // else if (acctEmailRef.current.value.indexOf('.com') === -1){
        //     acctEmailRef.current.style.borderColor = 'red'
        // } 
        // else if (inputEmail != null) {
        //     acctEmailRef.current.style.borderColor = 'red'
        //     // alert('Account already exists')
        // }
        // else {
        //     acctEmailRef.current.style.borderColor = 'green'
        //     emailChecker = true;
        // }
        // if(!insecurePwordRef.current.value){
        //     insecurePwordRef.current.style.borderColor = 'red'
        //     // return alert('Set password!');  
        // } 
        // else if (insecurePwordRef.current.value.length < 8) {
        //     insecurePwordRef.current.style.borderColor = 'red'
        //     // return alert('Password is too weak')
        // } 
        // else {
        //     insecurePwordRef.current.style.borderColor = 'green'
        //     passwordChecker = true;
        // }
    }

    // Function for account creation
    const handleCreateAcct = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        // handleErrors(event);
        if (validated) {
            setShow(false);
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
            acctNameRef.current.value = null
            acctEmailRef.current.value = null
            insecurePwordRef.current.value = null
            initBalRef.current.value = null
        }
    
    } 

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

    return (
        
        <div className="accountList">

            {/* <Navigation transactionHistory={transactionHistory}/> */}
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

            <Modal show={show} onHide={handleClose} id="register_modal">

                <Modal.Header id="modal_head">
                    <Modal.Title>Create New Account</Modal.Title>
                </Modal.Header>

                <Modal.Body id="modal_body">

                    <Form id="register2" noValidate validated={validated} onSubmit="handleCreateAcct">
                            
                        <Form.Group className="mb-3">
                            <Form.Label id="create-name">Account Holder Name:</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" required ref={acctNameRef} id="name_input" onChange={(e) => setAcctName(e.target.value)} />
                            <div className="create-email-placeholder"><Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label id="create-email">Email address:</Form.Label>
                            
                            <Form.Control type="email" placeholder="name@example.com" required ref={acctEmailRef} id="email_input" onChange={(e) => setAcctEmail(e.target.value)}/>
                            <div className="create-email-placeholder"><Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label id="create-password">Password:</Form.Label>
                            <Form.Control type="password" placeholder="********" min="5" required ref={insecurePwordRef}  id="password_input" onChange={(e) => setPword(e.target.value)}/>
                            <div className="create-email-placeholder"><Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label id="create-balance">Initial Balance:</Form.Label>
                            <Form.Control className="number-input" type="number" placeholder="0" ref={initBalRef}  id="balance_input" onChange={(e) => setBal(e.target.value)} onInput={props.validate}/>
                            <div className="create-email-placeholder"><Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        <Button type="submit" id="create_account" variant="primary" onClick={handleCreateAcct}>
                            Create Account
                        </Button> 
                        {<Button id="close" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>}

                    </Form>

                </Modal.Body>

            </Modal>

        </div>
    )
}

export default AccountList;
