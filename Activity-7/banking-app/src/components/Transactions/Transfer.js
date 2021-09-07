import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from "react-router-dom";
import '../../css/Deposit.css'

const Transfer = (props) => {
    const location = useLocation();
    const {LOCAL_STORAGE_KEY_1, LOCAL_STORAGE_KEY_2} = location.state;
    const generateDate = props.generateDate
    const TransactionClass = props.TransactionClass
    const validate = props.validate

    const [accts, setAccts] = useState([]);
    const [fromAcctNum, setFromAcctNum] = useState('');
    const [toAcctNum, setToAcctNum] = useState('');
    const [transferAmt, setTransferAmt] = useState(0);
    const [transactionHistory, setTransactionHistory] = useState([]);

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

    //Function to transfer
    const handleTransfer = () => {
        const fromAcct = accts.find(acct => {return acct["Account No."] === fromAcctNum})
        const toAcct = accts.find(acct => {return acct["Account No."] === toAcctNum})
        if(fromAcct && toAcct) {
            if(fromAcct["Balance"]>= parseInt(transferAmt*100)/100) {
                var newBalFromAcct = (fromAcct["Balance"]*100 - transferAmt*100)/100;
                setAccts([...accts], fromAcct["Balance"] = newBalFromAcct)
                var newBalToAcct = (toAcct["Balance"]*100 - (-transferAmt)*100)/100
                setAccts([...accts], toAcct["Balance"] = newBalToAcct)
                var date = generateDate();
                var newTransaction = new TransactionClass(uuidv4(), date, fromAcctNum, toAcctNum, "Transfer", transferAmt);
                setTransactionHistory(prevTransactions => {
                    return [...prevTransactions, newTransaction]
                })
            }
            else {
                alert('Insufficient Funds')
            }
        }
        else if (!fromAcct) {
            alert('Sending Account does not exist')
        }
        else {
            alert('Receiving Account does not exist')
        }
    }

    return (
        <div className="transact-parent">
           {/* Transfer Form */}
            <div className="transact-sub" id="transfer-sub"> 
                <div className="transact-sub2">
                    <Form className="form-class">
                        <Form.Group className="mb-3">
                            <Form.Label>Sender Account No.</Form.Label>
                            <Form.Control type="number" placeholder="Account No." onChange={(e) => setFromAcctNum(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Receiver Account No.</Form.Label>
                            <Form.Control type="number" placeholder="Account No." onChange={(e) => setToAcctNum(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control className="number-input" type="number" placeholder="0" onInput={validate} onChange={(e) => setTransferAmt(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    <br />
                    <Form.Text className="text-muted"></Form.Text>
                    <br />
                    <Button variant="primary" onClick={handleTransfer}>
                        Transfer
                    </Button>
                </div>
            </div> 
        </div>
    )
}

export default Transfer
