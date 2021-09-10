import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Account from './Account'
import '../../css/Account.css'
import CreateAcctModal from './CreateAcctModal';

const LOCAL_STORAGE_KEY_1 = 'userList';

const AccountList = (props) => {
    //account data states
    const [accts, setAccts] = useState([]);

    // on mount, will load existing accounts and transactions
    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAccts(storedAccts);
        console.log(accts)
    }, [])

    // console.log(accts)

    // on change accts, will load existing accounts and transactions
    // useEffect(() => {
    //     const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
    //     if (storedAccts) setAccts(storedAccts);
    //     // localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
    // }, [accts])


    // console.log(accts)
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
            <CreateAcctModal />
        </div>
    )
}

export default AccountList;
