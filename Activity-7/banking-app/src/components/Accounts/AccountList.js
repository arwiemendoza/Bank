import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Account from './Account'

const LOCAL_STORAGE_KEY = 'userList';

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
    const [withdrawAmt, setWithdrawAmt] = useState(0);
    // const [depositAmt, setDepositAmt] = useState(0);
    // const [transferAmt, setTransferAmt] = useState(0);

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

    // on mount, will load existing users
    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedUsers) setAccts(storedUsers);
    }, [])

    // on add new account, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accts));
    }, [accts])

    // Account number generator
    const generateAcctNum = () => {
        let date = new Date();
        let min = (date.getMinutes()).toString().substr(-2);
        setAcctNum(Math.floor(Math.random() * 90) + min)
    }

    // Function for account creation
    const createAcct = () => {
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

    //Function to withdraw
    const withdrawMoney = () => {
        const acct = accts.find(user => {return user["Account No."] === acctNum})
        if(acct) {
            if(acct["Balance"]>= withdrawAmt) {
                var newBal = acct["Balance"] - withdrawAmt;
                setAccts([...accts], acct["Balance"] = newBal)
            }
            else {
                alert('Insufficient Funds')
            }
        }
        else {
            alert('Account does not exist')
        }
    }

    const handleRegKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.code === 'Enter') {
            createAcct();
        }
    };


    return (
        <div>
            <Button variant="primary"  onClick={handleShow}>Add Account Holder</Button>

            <Table responsive className ="container" id="userTable">
                <thead>
                    <tr>
                    <th>Account No.</th>
                    <th>Account Name</th>
                    <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accts.map(user => {
                        return <Account key={user['Account No.']} user = {user}/>
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
                <Button type="submit" variant="primary" onClick={createAcct}>
                    Create Account
                </Button>
                </Modal.Footer>
            </Modal>

            {/* Withdraw Form */}
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setAcctNum(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="0" onChange={(e) => setWithdrawAmt(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={withdrawMoney}>
                    Withdraw
                </Button>
            </div>
        </div>
    )
}

export default AccountList
