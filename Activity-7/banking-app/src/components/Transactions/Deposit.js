import React, {useState, useEffect, useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
// import { useLocation } from "react-router-dom";
import '../../css/Deposit.css'
import AccountListTransactions from '../Accounts/AccountListTransactions'

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';

const Deposit = (props) => {
    // const location = useLocation();
    // const {LOCAL_STORAGE_KEY_1, LOCAL_STORAGE_KEY_2} = location.state;
    const generateDate = props.generateDate
    const TransactionClass = props.TransactionClass
    const validate = props.validate

    const [accts, setAccts] = useState([]);
    const [fromAcctNum, setFromAcctNum] = useState('');
    const [depositAmt, setDepositAmt] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

    //messages
    const [depositMessage, setDepositMessage] = useState('');

    const depositAmtRef = useRef();

    useEffect(() => {
        const storedAccts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_1));
        if (storedAccts) setAccts(storedAccts)
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

    //Function to deposit
    const handleDeposit = () => {
        const fromAcct = accts.find(acct => {return acct.id === fromAcctNum})
        if(fromAcct) {
                setDepositMessage(`Depositing ${depositAmt} from ${fromAcct["Account Name"]}'s account...`)
                setTimeout(() =>{
                    var newBal = (fromAcct["Balance"]*100 - (-depositAmt)*100)/100;
                    setAccts([...accts], fromAcct["Balance"] = newBal)
                    var date = generateDate();
                    var newTransaction = new TransactionClass(uuidv4(), date, null, fromAcctNum, "Deposit", depositAmt);
                    setTransactionHistory(prevTransactions => {
                        return [...prevTransactions, newTransaction]
                    })
                    depositAmtRef.current.value = null
                    setDepositMessage(`Successfully deposited. The new balance of ${fromAcct["Account Name"]} is ${newBal}`)
                }, 2000)
        }
        else {
            setDepositMessage(`Account does not exist`)
        }
    }
    return (
        <div>
            <div className="transact-parent">
                <h1 className="glitch" data-text="Deposit"> Deposit </h1>
                {/* Deposit Form */}
                <div className="transact-sub">
                    <div className="transact-sub2">
                    <Form className="form-class">
                        <Form.Group className="mb-3">
                            <Form.Label>Account No.</Form.Label>
                            <Form.Control type="number" className="number-input" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)} onKeyPress={(e) => setDepositMessage('')}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control ref={depositAmtRef} className="number-input" min="1" type="number" placeholder="0" onInput={validate} onChange={(e) => setDepositAmt(e.target.value)} onKeyPress={(e) => setDepositMessage('')}/>
                        </Form.Group>
                    </Form>
                    <br />
                    <div className="muted-container">
                        <Form.Text id="errorMessage" className="create-account-placeholder">{depositMessage}</Form.Text>
                    </div>
                    <br/>
                    
                    <Button id="deposit-button" className="transact-button" variant="primary" onClick={handleDeposit}>
                        Deposit
                    </Button>
                    </div>
                </div>
            </div>
            {/* <AccountListTransactions /> */}
        </div>
    )
}

export default Deposit
