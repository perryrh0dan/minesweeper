import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.scss';

import Minesweeper from './screens/minesweeper/minesweeper';
import Newgame from './screens/newgame/newgame';


export default function BasicExample() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Route exact path="/" component={Minesweeper} />
          <Route path="/new" component={Newgame} />
        </div>
      </div>
    </Router>
  );
}
