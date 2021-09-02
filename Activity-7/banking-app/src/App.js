// import React, {useReducer} from 'react';
import './App.css';
// import { Card, Button, Form} from 'react-bootstrap';
import UserList from './components/UserList'
import Withdraw from './components/Withdraw'
import Deposit from './components/Deposit'
import Transfer from './components/Transfer'

function App() {
  return (
    <div>
      <UserList />
      <Withdraw />
      <Deposit />
      <Transfer />
    </div>
  );
}

export default App;
