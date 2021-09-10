import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
import Account from './Account'
import '../../css/Account.css'
import CreateAcctModal from './CreateAcctModal';
// import Dinero from '../../../node_modules/dinero.js'

const LOCAL_STORAGE_KEY_1 = 'userList';
// const LOCAL_STORAGE_KEY_2 = 'transactionList';
// const LOCAL_STORAGE_KEY_3 = 'accountListTransactions'

const AccountList = (props) => {
    //account data states
    const [accts, setAccts] = useState([]);

    // on mount, will load existing accounts and transactions
    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAccts(storedAccts);
    }, [])

    const handleDelete = (e) => {
        const newAccts = [...accts]
        const updatedUserList = newAccts.filter(acct => !acct.ticked)
        setAccts(updatedUserList)
    }

    function toggleCheck(id) {
        const newAccts = [...accts]
        const acct = newAccts.find(acct => acct.id === id)
        acct.ticked = !acct.ticked
        setAccts(newAccts)
    }

    return (   
        <div className="accountList">
            <h1 className="glitch" id="account-header" data-text="Accounts"> Accounts </h1>

            <Button variant="primary" id="deleteAccounts" onClick = {handleDelete}>Delete Selected Accounts</Button>

            {/* Accounts List Table */}
            <div className="table-container">
                <Table responsive className ="container" id="userTable">
                    <thead>
                        <tr>
                        <th></th>
                        <th>Account No.</th>
                        <th>Account Name</th>
                        <th>Email</th>
                        <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accts.map(acct => {
                            return <Account emailDisplay={true} toggleCheck={toggleCheck} key={acct.id} acct = {acct}/>
                        })}
                    </tbody>
                </Table>
            </div>
            {/* <Button variant="primary" id="createAccount" onClick={handleShow}>{addButton}</Button> */}
            <CreateAcctModal />
        </div>
    )
}

export default AccountList;
