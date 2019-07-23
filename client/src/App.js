import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Members from "./pages/Members";

function App() {
  return (
    <Router>
      <Navbar />
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/members" component={Members} />
        </Switch>
    </Router>
  );
}

export default App;


