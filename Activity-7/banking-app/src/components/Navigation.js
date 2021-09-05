import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import '../css/Account.css'
import Dropdown from 'react-bootstrap/Dropdown';


function Navigation(props) {
    const LOCAL_STORAGE_KEY_1 = props.LOCAL_STORAGE_KEY_1;
    const LOCAL_STORAGE_KEY_2 = props.LOCAL_STORAGE_KEY_2;
    const location = useLocation();

    if (location.pathname.match('/login')){
        return null;
    }

    return (
        <div className="navigation">

            <Dropdown className="d-inline-block">
                    <Dropdown.Toggle id="buttondrop" className= 'e-caret-hide'></Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item>
                    <Link className="nav-link" to="/accounts">
                    Accounts
                    </Link>
                </Dropdown.Item>
                <span>Transactions</span>

                <Dropdown.Item>
                    <Link className="nav-link" to={{
                        pathname: "/withdraw", 
                    state: {
                        LOCAL_STORAGE_KEY_1, 
                        LOCAL_STORAGE_KEY_2}}}>
                    Withdraw
                    </Link>
                </Dropdown.Item>
                        
                <Dropdown.Item>
                    <Link className="nav-link" to={{
                        pathname: "/deposit", 
                    state: {
                        LOCAL_STORAGE_KEY_1, 
                        LOCAL_STORAGE_KEY_2}}}>
                    Deposit
                    </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                    <Link className="nav-link" to={{
                        pathname: "/transfer", 
                    state: {
                        LOCAL_STORAGE_KEY_1, 
                        LOCAL_STORAGE_KEY_2}}}>
                    Transfer
                    </Link>
                </Dropdown.Item>

                <Dropdown.Item>
                    <Link className="nav-link" to={{
                        pathname: "/transactions", 
                    /*state: {transactionHistoryProp}*/}}>
                    Transaction History
                    </Link>
                </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>
        </div>
    );
}

export default withRouter(Navigation);
