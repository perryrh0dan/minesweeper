import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.scss';

import Minesweeper from './screens/minesweeper/minesweeper';
import Menu from './screens/menu/menu';


export default function BasicExample() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Route exact path="/" component={Menu} />
          <Route path="/game" component={Minesweeper} />
        </div>
      </div>
    </Router>
  );
}
