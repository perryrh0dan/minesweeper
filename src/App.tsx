import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";

import Minesweeper from "./screens/minesweeper/minesweeper";
import Menu from "./screens/menu/menu";

export default function BasicExample() {
  return (
    <div className="App">
      <div className="content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="game" element={<Minesweeper />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
