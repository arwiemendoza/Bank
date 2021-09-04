// import React, {useReducer} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Login, Contact, AccountList } from "./components";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Login />} />
          <Route path="/accounts" exact component={() => <AccountList />} />
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
