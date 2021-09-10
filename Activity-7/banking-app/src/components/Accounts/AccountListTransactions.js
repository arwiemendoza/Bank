// import React, {useState, useRef, useEffect} from 'react'
// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import Account from './Account'
// import '../../css/Account.css'

// const LOCAL_STORAGE_KEY_1 = 'userList';
// const LOCAL_STORAGE_KEY_2 = 'transactionList';
// const LOCAL_STORAGE_KEY_3 = 'accountListTransactions';
// const LOCAL_STORAGE_KEY_4 = 'fromAcct';

// const AccountListTransactions = (props) => {
//     //account data states
//     const [acctList, setAcctList] = useState([]);
//     const [fromAcctNum, setFromAcctNum] = useState('');

//     // on mount, will load existing accounts and transactions
//     useEffect(() => {
//         const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
//         if (storedAccts) setAcctList(storedAccts);
//     }, [])

//     // on type in account num, will add to local storage
//     useEffect(() => {
//         // localStorage.setItem(LOCAL_STORAGE_KEY_4, JSON.stringify(fromAcctNum));
//         const storedFromAcct = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_4));
//         if (storedFromAcct) setFromAcctNum(storedFromAcct);
//     }, [fromAcctNum])

//     // on modify account, will add to local storage
//     useEffect(() => {
//         localStorage.setItem(LOCAL_STORAGE_KEY_3, JSON.stringify(acctList));
//     }, [acctList])

//     return (   
//         <div className="accountList">
//             {/* Accounts List Table */}
//             <div className="table-container">
//                 <Table responsive className ="container" id="userTable">
//                     <thead>
//                         <tr>
//                         <th>Account No.</th>
//                         <th>Account Name</th>
//                         <th>Balance</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {acctList
//                             .filter(acct => fromAcctNum === '' || acct.id.includes(fromAcctNum))
//                             .map(acct => {
//                                 return <Account emailDisplay={false} key={acct.id} acct = {acct}/>
//                             })
//                         }
//                     </tbody>
//                 </Table>
//             </div>
//         </div>
//     )
// }

// export default AccountListTransactions;
