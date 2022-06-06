import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.scss";

import Minesweeper from "./screens/minesweeper/minesweeper";
import Menu from "./screens/menu/menu";

export default function BasicExample() {
  return (
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="game" element={<Minesweeper />} />
        </Routes>
      </div>
    </div>
  );
}
