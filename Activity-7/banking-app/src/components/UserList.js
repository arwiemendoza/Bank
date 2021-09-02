import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import User from './User'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'userList';

const UserList = () => {
    const [show, setShow] = useState(false);
    const [acctNum, setAcctNum] = useState(uuidv4());
    const [users, setUsers] = useState([]);

    const acctNameRef = useRef();
    const initBalRef = useRef();
    const acctEmailRef = useRef();
    const insecurePwordRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedUsers) setUsers(storedUsers);
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
    }, [users])

    const accountCreation = () => {
        var acctName = acctNameRef.current.value;
        var initBal = initBalRef.current.value;
        var acctEmail = acctEmailRef.current.value;
        var insecurePword = insecurePwordRef.current.value;
        setAcctNum(uuidv4())
        setShow(false)

        setUsers(prevUsers => {
            return [...prevUsers, {'Account No.': acctNum, 'Account Name': acctName, 'Email': acctEmail, 'Password': insecurePword, 'Balance': initBal}]
        })
        
        // alert('Account Created Sucessfully!');
    }
    

    return (
        <div>

            <Button variant="warning"  onClick={handleShow}>Add Account Holder</Button>

            <Table responsive className ="container" id="userTable">
                <thead>
                    <tr>
                    <th>Account No.</th>
                    <th>Account Name</th>
                    <th>Balance</th>
                    </tr>
                </thead>
                {users.map(user => {
                    return <User key={user['Account No.']} user = {user}/>
                })}
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Create New Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" ref={acctNameRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" ref={acctEmailRef} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="********" ref={insecurePwordRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Initial Balance</Form.Label>
                            <Form.Control type="number" placeholder="0" ref={initBalRef}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={accountCreation}>
                    Create Account
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserList
