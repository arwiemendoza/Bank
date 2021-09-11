import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import {Navigation, Login, UserTransaction, AccountList, Withdraw, Deposit, Transfer, Dashboard } from "./components";

const LOCAL_STORAGE_KEY_1 = 'userList';
const LOCAL_STORAGE_KEY_2 = 'transactionList';

function App() {
  // Date and Time generator
  const generateDate = () => {
    var date = '';
    //Date
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var day = currentDate.getDate();
    var month = currentDate.getMonth();
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Time
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var partOfDay;
    if (h < 12) {
        partOfDay = "AM";
    }
    else {
        partOfDay = "PM";
    }
    if (h > 12) {
        h = h - 12;
    }
    if (h === 24) {
        h = 12;
    }
    if (m < 10) {
        m = "0" + m;
    }

    // Add to variable
    date = `${monthArray[month]} ${day} ${year} ${h}:${m} ${partOfDay}`;

    return date;
  }

  //template object for transactions
  class TransactionClass {
    constructor(transactionId, transactionDate, transactionFromAcctNum, transactionToAcctNum, transactionType, transactionAmt) {
        this.transactionId = transactionId;
        this.transactionDate = transactionDate;
        this.transactionFromAcctNum = transactionFromAcctNum;
        this.transactionToAcctNum = transactionToAcctNum;
        this.transactionType = transactionType;
        this.transactionAmt = transactionAmt
    }
  }

  //limit to 2 decimal places onInput
  const validate = (e) => {
    e.target.value = (e.target.value.indexOf(".") >= 0) ? (e.target.value.substr(0, e.target.value.indexOf(".")) + e.target.value.substr(e.target.value.indexOf("."), 3)) : e.target.value;
  }

  return (
    <div className="ApplicationTest">
      <Router>
        <Navigation 
          LOCAL_STORAGE_KEY_1={LOCAL_STORAGE_KEY_1} 
          LOCAL_STORAGE_KEY_2={LOCAL_STORAGE_KEY_2} />
        <Switch>
          <Route path="/login" exact component={(props) => (<Login {...props} isAuthed={true} />)} />
          <Route path="/accounts" exact 
            render={(props) => (
            <AccountList {...props} 
            validate = {validate}
            isAuthed={true} />)} />
          <Route path="/transactions" exact render={(props) => (<UserTransaction {...props} isAuthed={true} />)}/>
          <Route path="/withdraw" exact 
            render={(props) => (
            <Withdraw {...props}
              generateDate={generateDate} 
              TransactionClass = {TransactionClass}
              validate = {validate}
              isAuthed={true} />)}/>
          <Route path="/deposit" exact 
            render={(props) => (
              <Deposit {...props} 
              generateDate={generateDate} 
              TransactionClass = {TransactionClass}
              validate = {validate}
              isAuthed={true} />)}/>
          <Route path="/transfer" exact 
            render={(props) => (
              <Transfer {...props} 
              generateDate={generateDate} 
              TransactionClass = {TransactionClass}
              validate = {validate}
              isAuthed={true} />)}/>
          <Route path="/client/dashboard" exact 
            render={(props) => (
            <Dashboard {...props} 
            isAuthed={true} />)} />
          <Route path="/" >
            <Redirect to="/login"/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
