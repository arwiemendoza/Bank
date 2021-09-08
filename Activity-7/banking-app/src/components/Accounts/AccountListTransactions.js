import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Account from './Account'
import '../../css/Account.css'

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';

const AccountListTransactions = (props) => {
    //account data states
    const [acctList, setAcctList] = useState([]);

    // on mount, will load existing accounts and transactions
    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAcctList(storedAccts);
    }, [])

    // on modify account, will add to local storage
    useEffect(() => {
        localStorage.setItem('accountListTransactions', JSON.stringify(acctList));
    }, [acctList])

    return (   
        <div className="accountList">
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
                        {acctList.map(acct => {
                            return <Account key={acct['Account No.']} acct = {acct}/>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AccountListTransactions;
