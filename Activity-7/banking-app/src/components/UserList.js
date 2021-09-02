import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


if(localStorage.getItem('userList') == null) {
    localStorage.setItem('userList', '[]');
}

const UserList = () => {
    const [show, setShow] = useState(false);
    const [acctNum, setAcctNum] = useState(1);
    const [users, setUsers] = useState([]);

    const acctNameRef = useRef();
    const initBalRef = useRef();
    const acctEmailRef = useRef();
    const insecurePwordRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const accountCreation = () => {
        var table = document.getElementById("userTable");
        var acctName = acctNameRef.current.value;
        var initBal = initBalRef.current.value;
        var acctEmail = acctEmailRef.current.value;
        var insecurePword = insecurePwordRef.current.value;
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        setAcctNum(acctNum + 1)
        cell1.innerHTML = acctNum;
        cell2.innerHTML = acctName;
        cell3.innerHTML = initBal;
        setShow(false)
        
        const oldData = JSON.parse(localStorage.getItem('userList'));

        oldData.push({'Account No.': acctNum, 'Account Name': acctName, 'Email': acctEmail, 'Password': insecurePword, 'Balance': initBal});
        localStorage.setItem('userList', JSON.stringify(oldData));
        alert('Account Created Sucessfully!');
    }
    

    return (
        <div>
            <Table responsive className ="container" id="userTable">
                <thead>
                    <tr>
                    <th>Account No.</th>
                    <th>Account Name</th>
                    <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>

            <Button variant="warning"  onClick={handleShow}>Add Account Holder</Button>{' '}

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
