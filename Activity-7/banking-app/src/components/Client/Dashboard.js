import React, {useState, useEffect, useRef} from 'react'
import './client-css/dashboard.css'
import { useLocation } from "react-router-dom";
import Dinero from '../../../node_modules/dinero.js'

const LOCAL_STORAGE_KEY_1 = 'userList';

const Dashboard = () => {   
    const location = useLocation();
    const {email, accts} = location.state;
    const [clientDetails, setClientDetails] = useState({});
    const [clientAcct, setClientAcct] = useState([]);

    const withdrawRef = useRef()
    const depositRef = useRef()
    const transferRef = useRef()

    useEffect(() => {
        setClientDetails(accts.find(acct => acct['Email'] === email))
    }, [])

    // on modify account, will add to local storage
    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY_1, JSON.stringify(clientAcct));
    // }, [clientAcct])


    console.log(clientDetails)
    return (
        <div>
            <div className="client-parent">
                <div className="client-bal">
                    {/* {email} */}
                    <div>
                        {clientDetails["Balance"] && Dinero({ amount: parseInt(clientDetails["Balance"] * 100), currency: 'PHP' }).toFormat()}
                    </div>
                    <div>
                        {clientDetails && clientDetails.id}
                    </div>
                    <div>
                        {clientDetails["Account Name"] && clientDetails["Account Name"]}
                    </div>
                </div>
                <div className="slider">
                    
                    <div className="slides">
                        <div id="slide-1">
                            <div className="withdrawTitle">Withdraw</div>
                            <div className="withdrawFormContainer">
                                <form>
                                    <input type="number" ref={withdrawRef}></input>
                                </form>
                                <button></button>
                            </div>
                        </div>
                        <div id="slide-2">
                            <div className="depositTitle">Deposit</div>
                            <div className="depositFormContainer">
                                <form>
                                    <input type="number" ref={depositRef}></input>
                                </form>
                                <button></button>
                            </div>
                        </div>
                        <div id="slide-3">
                            <div  className="transferTitle">Transfer Funds</div>
                            <div className="transferFormContainer">
                                <form>
                                    <input type="number" ref={transferRef}></input>
                                </form>
                                <button></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
