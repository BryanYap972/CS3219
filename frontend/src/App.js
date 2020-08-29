import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Welcome from "./Auth/Welcome";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Welcome" exact component={Welcome} />
        <Route path="/Login" exact component={Login} />
        <Route path="/SignUp" exact component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
