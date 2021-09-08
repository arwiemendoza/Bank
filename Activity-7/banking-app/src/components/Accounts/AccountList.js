import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Account from './Account'
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

    //error messages
    const [fullNameErrorMessage, setFullNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const addButton = "{+}";
    var nameChecker;
    var emailChecker;
    var passwordChecker;

    // input reference
    const acctNameRef = useRef();
    const acctEmailRef = useRef();
    const insecurePwordRef = useRef();
    const initBalRef = useRef();

    // on mount, will load existing accounts and transactions
    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAccts(storedAccts);
    }, [])

    // on modify account, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
    }, [accts])

    // functions for modal
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
        generateAcctNum()
        setValidated(false)
        setFullNameErrorMessage('')
        setEmailErrorMessage('')
        setPasswordErrorMessage('')
    };

    // Account number generator
    const generateAcctNum = () => {
        let date = new Date();
        let min = (date.getMinutes()).toString().substr(-2);
        setAcctNum(Math.floor(Math.random() * 90) + min)
    }

    // Function for error checking
    const handleErrors = (event) => {
        nameChecker = false;
        emailChecker = false;
        passwordChecker = false;
        var inputEmail = accts.find(acct => {return acct["Email"] === acctEmailRef.current.value})
        if (!acctNameRef.current.value) {
            setFullNameErrorMessage('Name is required')
            // fullNameError.textContent = "Name is required"
            acctNameRef.current.style.borderColor = 'red'
            acctNameRef.current.focus()
        }
        else if (!isNaN(acctNameRef.current.value.substring(0, 1))) {
            setFullNameErrorMessage('Please enter valid name')
            acctNameRef.current.style.borderColor = 'red'
            // fullNameError.textContent = "Name should not start with a number"
            acctNameRef.current.focus()
        }
        else {
            setFullNameErrorMessage('')
            acctNameRef.current.style.borderColor = 'green'
            nameChecker = true;
        }
        if (!acctEmailRef.current.value) {
            setEmailErrorMessage('Email is required')
            // emailError.textContent = "Email is required"
            acctEmailRef.current.style.borderColor = 'red'
            if(nameChecker) {
                acctEmailRef.current.focus()
            }
        }  
        else if (acctEmailRef.current.value.indexOf('@') === -1){
            setEmailErrorMessage('Please enter valid email')
            // emailError.textContent = "Please enter valid email"
            acctEmailRef.current.style.borderColor = 'red' 
            if(nameChecker) {
                acctEmailRef.current.focus()
            }
        } 
        else if (acctEmailRef.current.value.indexOf('.com') === -1){
            setEmailErrorMessage('Please enter valid email')
            acctEmailRef.current.style.borderColor = 'red'
            if(nameChecker) {
                acctEmailRef.current.focus()
            }
        } 
        else if (inputEmail != null) {
            setEmailErrorMessage('Account already exists')
            acctEmailRef.current.style.borderColor = 'red'
            if(nameChecker) {
                acctEmailRef.current.focus()
            }
        }
        else {
            setEmailErrorMessage('')
            acctEmailRef.current.style.borderColor = 'green'
            emailChecker = true;
        }
        if(!insecurePwordRef.current.value){
            setPasswordErrorMessage('Password is required')
            insecurePwordRef.current.style.borderColor = 'red'
            if(emailChecker && nameChecker) {
                insecurePwordRef.current.focus()
            }
        } 
        else if (insecurePwordRef.current.value.length < 8) {
            setPasswordErrorMessage('Password is too weak')
            insecurePwordRef.current.style.borderColor = 'red'
            if(emailChecker && nameChecker) {
                insecurePwordRef.current.focus()
            }
        } 
        else {
            setPasswordErrorMessage('')
            insecurePwordRef.current.style.borderColor = 'green'
            passwordChecker = true;
        }
    }

    // Function for account creation
    const handleCreateAcct = (event) => {
        handleErrors();

        if(!passwordChecker || !emailChecker || !nameChecker) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        else {
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
                    <Form  id="register2" noValidate validated={validated} onSubmit={handleCreateAcct} >
                            
                        <Form.Group className="mb-3">
                            <Form.Label id="create-name">Account Holder Name*:</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" required ref={acctNameRef} id="name_input" onChange={(e) => setAcctName(e.target.value)} /> {/*onKeyPress={handleRegKeypress} />*/}
                            <div className="create-email-placeholder">{fullNameErrorMessage}<Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label id="create-email">Email address*:</Form.Label>
                            
                            <Form.Control type="email" placeholder="name@example.com" required ref={acctEmailRef} id="email_input" onChange={(e) => setAcctEmail(e.target.value)}/>
                            <div className="create-email-placeholder">{emailErrorMessage}<Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label id="create-password">Password*:</Form.Label>
                            <Form.Control type="password" placeholder="********" min="5" required ref={insecurePwordRef}  id="password_input" onChange={(e) => setPword(e.target.value)}/>
                            <div className="create-email-placeholder">{passwordErrorMessage}<Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label id="create-balance">Initial Balance:</Form.Label>
                            <Form.Control className="number-input" min="0" type="number" placeholder="0" ref={initBalRef}  id="balance_input" onChange={(e) => setBal(e.target.value)} onInput={props.validate}/>
                            <div className="create-email-placeholder"><Form.Text className="text-muted"></Form.Text></div>
                        </Form.Group>
                        {<Button id="close" variant="secondary" onClick={handleClose}>
                            Close
                        </Button>}
                        <Button type="submit" id="create_account" variant="primary">
                            Create Account
                        </Button> 
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AccountList;
