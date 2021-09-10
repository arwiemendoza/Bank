import React, {useState, useEffect, useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import '../../css/Withdraw.css'
import AccountListTransactions from '../Accounts/AccountListTransactions'
import Table from 'react-bootstrap/Table';
import Account from '../Accounts/Account'

const Withdraw = (props) => {
    const location = useLocation();
    const {LOCAL_STORAGE_KEY_1, LOCAL_STORAGE_KEY_2} = location.state;
    const generateDate = props.generateDate
    const TransactionClass = props.TransactionClass
    const validate = props.validate

    const [accts, setAccts] = useState([]);
    const [acctList, setAcctList] = useState([]);
    const [fromAcctNum, setFromAcctNum] = useState('');
    const [withdrawAmt, setWithdrawAmt] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

    //messages
    const [withdrawMessage, setWithdrawMessage] = useState('');

    const withdrawAmtRef = useRef();

    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAccts(storedAccts);
        const storedTransactions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_2));
        if (storedTransactions) setTransactionHistory(storedTransactions);
        if (storedAccts) setAcctList(storedAccts);
    }, [])

    //filterlist
    useEffect(() => {
        localStorage.setItem('accountListTransactions', JSON.stringify(acctList));
    }, [acctList])

    // on modify account, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(accts));
    }, [accts])

    // on new transactions, will add to local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_2, JSON.stringify(transactionHistory));
    }, [transactionHistory])

    //Function to withdraw
    const handleWithdraw = () => {
        const fromAcct = accts.find(acct => {return acct.id === fromAcctNum})
        if(fromAcct) {
            if(fromAcct["Balance"]>= parseInt(withdrawAmt*100)/100) {
                setWithdrawMessage(`Withdrawing ${withdrawAmt} from ${fromAcct["Account Name"]}'s account...`)
                setTimeout(() =>{
                    var newBal = (fromAcct["Balance"]*100 - withdrawAmt*100)/100;
                    setAccts([...accts], fromAcct["Balance"] = newBal);
                    var date = generateDate();
                    var newTransaction = new TransactionClass(uuidv4(), date, fromAcctNum, null, "Withdraw", withdrawAmt);
                    setTransactionHistory(prevTransactions => {
                        return [...prevTransactions, newTransaction]
                    })
                    withdrawAmtRef.current.value = null
                    setWithdrawMessage(`Successfully withdrawn. The new balance of ${fromAcct["Account Name"]} is ${newBal}`)
                }, 2000)
            }
            else {
                setWithdrawMessage('Insufficient Funds')
            }
        }
        else {
            setWithdrawMessage('Account does not exist')
        }
    }

    const handelAcctNumKeypress = (e) => {
        setWithdrawMessage('')

        // acctList.filter((user) => {return fromAcct[] === fromAcctNum})

    }

    return (
        <div> 
            <div className="transact-parent">
                <h1  className="glitch" data-text="Withdraw"> Withdraw </h1>

                {/* Withdraw Form */}
                <div className="transact-sub">
                    <div className="transact-sub2">
                        <Form className="form-class">
                            <Form.Group className="mb-3">
                                <Form.Label>Account No.</Form.Label>
                                <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)} onKeyPress={(e) => handelAcctNumKeypress(e)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Amount:</Form.Label>
                                <Form.Control ref={withdrawAmtRef} className="number-input" min="1" type="number" placeholder="0" onInput={validate} onChange={(e) => setWithdrawAmt(e.target.value)} onKeyPress={(e) => setWithdrawMessage('')}/>
                            </Form.Group>
                        </Form>
                        <br/>
                        <div className="muted-container">
                            <Form.Text id="errorMessage" className="text-muted">{withdrawMessage}</Form.Text>
                        </div>
                        <br/> 
                        <Button className="transact-button" variant="primary" onClick={handleWithdraw}>
                            Withdraw
                        </Button>
                    </div>
                </div>
            </div>
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
        </div>
    )
}

export default Withdraw
