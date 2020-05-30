import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Notes from "./components/Notes/Notes";
import Home from "./components/Home/Home";

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/notes" component={Notes} />
    </div>
  </Router>
);

export default App;
