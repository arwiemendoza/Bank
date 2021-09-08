import React, {useState, useEffect, useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import '../../css/Deposit.css'

const Deposit = (props) => {
    const location = useLocation();
    const {LOCAL_STORAGE_KEY_1, LOCAL_STORAGE_KEY_2} = location.state;
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
        const fromAcct = accts.find(acct => {return acct["Account No."] === fromAcctNum})
        if(fromAcct) {
                setDepositMessage(`Depositing ${depositAmt} from ${fromAcct["Account Name"]}'s account`)
                setTimeout(() =>{
                    var newBal = (fromAcct["Balance"]*100 - (-depositAmt)*100)/100;
                    setAccts([...accts], fromAcct["Balance"] = newBal)
                    var date = generateDate();
                    var newTransaction = new TransactionClass(uuidv4(), date, null, fromAcctNum, "Deposit", depositAmt);
                    setTransactionHistory(prevTransactions => {
                        return [...prevTransactions, newTransaction]
                    })
                    depositAmtRef.current.value = null
                    setDepositMessage(`Successfully Deposited. New balance of ${fromAcct["Account Name"]} is ${newBal}`)
                }, 2000)
        }
        else {
            setDepositMessage(`Account does not exist`)
        }
    }
    return (
        <div className="transact-parent">
            {/* Deposit Form */}
            <div className="transact-sub">
                <div className="transact-sub2">
                <Form className="form-class">
                    <Form.Group className="mb-3">
                        <Form.Label>Account No.</Form.Label>
                        <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)} onKeyPress={(e) => setDepositMessage('')}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Amount:</Form.Label>
                        <Form.Control ref={depositAmtRef} className="number-input" min="1" type="number" placeholder="0" onInput={validate} onChange={(e) => setDepositAmt(e.target.value)} onKeyPress={(e) => setDepositMessage('')}/>
                    </Form.Group>
                </Form>
                <br />
                <Form.Text className="text-muted">{depositMessage}</Form.Text>
                <br/>
                
                <Button variant="primary" onClick={handleDeposit}>
                    Deposit
                </Button>
                </div>
            </div>
        </div>
    )
}

export default Deposit
