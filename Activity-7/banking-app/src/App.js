// import React, {useReducer} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Login, Contact, AccountList } from "./components";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/Login" exact component={() => <Login />} />
          <Route path="/accounts" exact component={() => <AccountList />} />
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
