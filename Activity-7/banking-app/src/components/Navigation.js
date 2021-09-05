import React from "react";
import { Link, withRouter } from "react-router-dom";
import '../css/Account.css'
import Dropdown from 'react-bootstrap/Dropdown';


function Navigation(props) {
    return (
        <div className="navigation">

            <Dropdown className="d-inline-block">
                    <Dropdown.Toggle id="buttondrop" className= 'e-caret-hide' caret></Dropdown.Toggle>
                <Dropdown.Menu>
                <span>Transactions</span>

                <Dropdown.Item>
                    <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                        <Link class="nav-link" to="/">
                        Withdraw
                        <span class="sr-only"></span>
                        </Link>
                    </li>
                </Dropdown.Item>
                        
                <Dropdown.Item>
                    <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                        <Link class="nav-link" to="/">
                        Deposit
                        <span class="sr-only"></span>
                        </Link>
                    </li>
                </Dropdown.Item>

                <Dropdown.Item>
                    <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                        <Link class="nav-link" to="/">
                        Transfer
                        <span class="sr-only"></span>
                        </Link>
                    </li>
                </Dropdown.Item>

                <Dropdown.Item>
                    <li class={`nav-item  ${props.location.pathname === "/" ? "active" : ""}`}>
                        <Link class="nav-link" to="/">
                        Transaction History
                        <span class="sr-only"></span>
                        </Link>
                    </li>
                </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>
        </div>
    );
}

export default withRouter(Navigation);
