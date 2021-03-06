import React, {useState, useEffect, useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
// import { useLocation } from "react-router-dom";
import '../../css/Deposit.css'
import Table from 'react-bootstrap/Table';
import Account from '../Accounts/Account'

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';
const LOCAL_STORAGE_KEY_3 = 'accountListTransactions';

const Transfer = (props) => {
    const generateDate = props.generateDate
    const TransactionClass = props.TransactionClass
    const validate = props.validate

    const [accts, setAccts] = useState([]);
    const [acctList, setAcctList] = useState([]);
    const [fromAcctNum, setFromAcctNum] = useState('');
    const [toAcctNum, setToAcctNum] = useState('');
    const [transferAmt, setTransferAmt] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

    //messages
    const [transferMessage, setTransferMessage] = useState('');

    //input reference
    const transferAmtRef = useRef()

    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAccts(storedAccts);
        const storedTransactions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_2));
        if (storedTransactions) setTransactionHistory(storedTransactions);
        if (storedAccts) setAcctList(storedAccts);
    }, [])

    // on modify account, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
    }, [accts])

    // on new transactions, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_2, JSON.stringify(transactionHistory));
    }, [transactionHistory])

    //filterlist
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_3, JSON.stringify(acctList));
    }, [acctList])

    //Function to transfer
    const handleTransfer = () => {
        const fromAcct = accts.find(acct => {return acct.id === fromAcctNum})
        const toAcct = accts.find(acct => {return acct.id === toAcctNum})
        if(fromAcct && toAcct) {
            if(fromAcct!==toAcct) {
                if(fromAcct["Balance"]>= parseInt(transferAmt*100)/100) {
                    setTransferMessage(`Transferring ${transferAmt} from ${fromAcct["Account Name"]} to ${toAcct["Account Name"]}'s account...`)
                    setTimeout(() =>{
                        var newBalFromAcct = (fromAcct["Balance"]*100 - transferAmt*100)/100;
                        setAccts([...accts], fromAcct["Balance"] = newBalFromAcct)
                        var newBalToAcct = (toAcct["Balance"]*100 - (-transferAmt)*100)/100
                        setAccts([...accts], toAcct["Balance"] = newBalToAcct)
                        var date = generateDate();
                        var newTransaction = new TransactionClass(uuidv4(), date, fromAcctNum, toAcctNum, "Transfer", transferAmt);
                        setTransactionHistory(prevTransactions => {
                            return [...prevTransactions, newTransaction]
                        })
                        transferAmtRef.current.value = null
                        setTransferMessage(`Successful Transfer.`)
                    }, 2000)
                }
                else {
                    setTransferMessage(`Insufficient Funds.`)
                }
            }
            else {
                setTransferMessage(`Cannot transfer to same account`)
            }
        }
        else if (!fromAcct) {
            setTransferMessage(`Account does not exist`)
        }
        else {
            setTransferMessage(`Account does not exist`)
        }
    }

    return (
        <div className="main-parent">
            <div className="transact-parent">
                <h1 className="glitch" data-text="Transfer"> Transfer </h1>

            {/* Transfer Form */}
                <div className="transact-sub"> 
                    <div className="transact-sub2">
                        <Form className="form-class">
                            <Form.Group className="mb-3">
                                <Form.Label>Sender Account No.</Form.Label>
                                <Form.Control type="number" className="number-input" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)} onKeyPress={(e) => setTransferMessage('')}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Receiver Account No.</Form.Label>
                                <Form.Control type="number" className="number-input" placeholder="Account No." onChange={(e) => setToAcctNum(e.target.value)} onKeyPress={(e) => setTransferMessage('')}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Amount:</Form.Label>
                                <Form.Control ref={transferAmtRef} className="number-input" type="number" placeholder="0" onInput={validate} onChange={(e) => setTransferAmt(e.target.value)} onKeyPress={(e) => setTransferMessage('')}/>
                            </Form.Group>
                        </Form>
                        <div className="muted-container">
                            <Form.Text id="errorMessage">{transferMessage}</Form.Text>
                        </div>
                        <Button id="transfer-button" className="transact-button" variant="primary" onClick={handleTransfer}>
                            Transfer
                        </Button>
                    </div>
                </div> 
            </div>
            {/* <AccountListTransactions /> */}
            <div className="accountList transactionAccountList">
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
                                .filter(acct => toAcctNum === '' || acct.id.includes(toAcctNum))
                                .map(acct => {
                                    return <Account emailDisplay={false} key={acct.id} acct = {acct}/>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Transfer
