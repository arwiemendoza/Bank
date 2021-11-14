import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import Account from './Account'

const AcctTable = ({emailDisplay, toggleCheck, accts}) => {
    return (
        <div>
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
        </div>
    )
}

export default AcctTable
