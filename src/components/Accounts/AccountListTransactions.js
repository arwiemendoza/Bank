import React, {useState, useRef, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Account from './Account'
import '../../css/Account.css'

const AccountListTransactions = ({acctList, fromAcctNum}) => {
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
                        {acctList
                            .filter(acct => fromAcctNum === '' || acct.id.includes(fromAcctNum))
                            .map(acct => {
                                return <Account emailDisplay={false} key={acct.id} acct = {acct}/>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default AccountListTransactions;
