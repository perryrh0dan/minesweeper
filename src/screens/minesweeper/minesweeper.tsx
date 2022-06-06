import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import qs from 'query-string';

import "./minesweeper.scss";

import Board from "../../components/game/board/board";
import { BoardModel, Status } from "../../models/board";
import Stats from "../../components/stats/stats";
import useStateRef from "../../hooks/useStateRef";

export interface MinesweeperLocationState {
  bombs: number;
  size: number;
}

export default function Minesweeper() {
  const [ board, setBoard, refBoard ] = useStateRef();
  // const [board, setBoard] = useState<BoardModel>();
  const navigate = useNavigate();
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
    if (!refBoard.current) return;
    const boardCopy: BoardModel = Object.assign(Object.create(Object.getPrototypeOf(refBoard.current)), refBoard.current)

    const positions = id.split(":");
    const x = Number(positions[0]);
    const y = Number(positions[1]);

    boardCopy.open(x, y);
    setBoard(boardCopy)
  }

  function onRightClickHandler(event: any) {
    event.preventDefault();
    if (!refBoard.current) return;
    const boardCopy: BoardModel = Object.assign(Object.create(Object.getPrototypeOf(refBoard.current)), refBoard.current)

    const positions = event.target.id.split(":");
    const x = Number(positions[0]);
    const y = Number(positions[1]);

    boardCopy.flag(x, y);
    setBoard(boardCopy);
  }

  function restart() {
    if (!refBoard.current) return;
    const boardCopy: BoardModel = Object.assign(Object.create(Object.getPrototypeOf(refBoard.current)), refBoard.current)

    boardCopy.generate();
    setBoard(boardCopy);
  }

  if (!board) {
    return <div>Loading</div>
  }

  return (
    <div className="minesweeper">
      <div className="header">
        <Stats status={board.status} flags={board.flags} timer={board.status}></Stats>
        <button onClick={restart}>Restart</button>
        <button onClick={() => navigate("/")}>Menu</button>
      </div>
      <Board
        board={board}
        blocked={board.status === Status.LOST || board.status === Status.WIN}
        onClickHandler={onClickHandler}
        onRightClickHandler={onRightClickHandler}
      ></Board>
    </div>
  );
}
