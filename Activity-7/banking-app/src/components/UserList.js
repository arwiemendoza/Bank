import React, {useState} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


if(localStorage.getItem('dataname') == null) {
    localStorage.setItem('dataname', '[]');
}
const UserList = () => {
    const [show, setShow] = useState(false);
    const [acctNum, setAcctNum] = useState(1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const accountCreation = () => {
        var table = document.getElementById("userTable");
        var acctName = document.getElementById("acctName").value;
        var initBal = document.getElementById("initBal").value;
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        setAcctNum(acctNum + 1)
        cell1.innerHTML = acctNum;
        cell2.innerHTML = acctName;
        cell3.innerHTML = initBal;
        setShow(false)
        
        const oldata = JSON.parse(localStorage.getItem('dataname'));
       
        oldata.push(acctName);
        localStorage.setItem('dataname', JSON.stringify(oldata));
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
                            <Form.Control type="text" placeholder="Full Name" id="acctName"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="********" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Initial Balance</Form.Label>
                            <Form.Control type="number" placeholder="0" id="initBal"/>
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
