import React, { useEffect, useMemo, useState } from "react";
import { RouteComponentProps, useHistory, useLocation } from "react-router-dom";
import qs from 'query-string';

import "./minesweeper.scss";

import Board from "../../components/game/board/board";
import { BoardModel, Status } from "../../models/board";
import Stats from "../../components/stats/stats";
import Gameover from "../../components/gameover/gameover";
import Win from "../../components/win/win";

export interface MinesweeperLocationState {
  bombs: number;
  size: number;
}

export interface IMinesweeperProps extends RouteComponentProps {}

export interface IMinesweeperState {
  board: BoardModel;
}

export default function Minesweeper() {
  const [board, setBoard] = useState<BoardModel>();
  const history = useHistory();
  const { search } = useLocation();
  const queryParams = useMemo(() => qs.parse(search), [search]);

  useEffect(() => {
    const size = queryParams.size as string || "10";
    const bombs = queryParams.bombs as string || "10";

    const board = new BoardModel(parseInt(size), parseInt(bombs));
    board.generate();

    setBoard(board);
  }, [setBoard, queryParams]);

  function onClickHandler(id: string) {
    if (!board) return;
    console.log(board.counter)
    const boardCopy: BoardModel = Object.assign(Object.create(Object.getPrototypeOf(board)), board)

    const positions = id.split(":");
    const x = Number(positions[0]);
    const y = Number(positions[1]);

    console.log(boardCopy.counter)
    boardCopy.open(x, y);
    setBoard(boardCopy)
  }

  function onRightClickHandler(event: any) {
    event.preventDefault();
    if (!board) return;
    const boardCopy = Object.assign(Object.create(Object.getPrototypeOf(board)), board)

    const positions = event.target.id.split(":");

    const x = Number(positions[0]);
    const y = Number(positions[1]);

    boardCopy.flag(x, y);
    setBoard(boardCopy);
  }

  function restart() {
    if (!board) return;
    const boardCopy = Object.assign(Object.create(Object.getPrototypeOf(board)), board)

    boardCopy.generate();
    setBoard(boardCopy);
  }

  if (!board) {
    return <div>Loading</div>
  }

  return (
    <div className="minesweeper">
      <Stats status={board.status} flags={board.flags}></Stats>
      <button onClick={restart}>Restart</button>
      <button onClick={() => history.goBack()}>Menu</button>
      <Board
        board={board}
        blocked={board.status === Status.LOST}
        onClickHandler={onClickHandler}
        onRightClickHandler={onRightClickHandler}
      ></Board>
      <Gameover show={board.status === Status.LOST}></Gameover>
      <Win show={board.status === Status.WIN}></Win>
    </div>
  );
}
