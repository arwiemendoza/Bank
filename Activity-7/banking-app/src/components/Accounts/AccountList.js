import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Account from './Account'
import CreateAcctModal from './CreateAcctModal'
import { v4 as uuidv4 } from 'uuid';
import '../../css/Account.css'

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';

const AccountList = (props) => {
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
            
        </div>
    )
}

export default AccountList;
