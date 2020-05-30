import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
 
import Notes from './components/Notes/Notes';
 
const App = () => (
  <Router>
    <Route path="/notes" component={ Notes } />
  </Router>
);
 
export default App;
