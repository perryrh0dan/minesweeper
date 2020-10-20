import React from "react";
import { RouteComponentProps } from "react-router-dom";

import "./minesweeper.scss";

import Board from "../../components/game/board/board";
import { BoardModel } from "../../models/board";
import Stats from "../../components/stats/stats";
import Gameover from "../../components/gameover/gameover";

export interface MinesweeperLocationState {
  bombs: number;
  size: number;
}

export interface IMinesweeperProps extends RouteComponentProps {}

export interface IMinesweeperState {
  board: BoardModel;
  state: "PROGRESS" | "WIN" | "LOST";
}

class Minesweeper extends React.Component<
  IMinesweeperProps,
  IMinesweeperState
> {
  readonly state: IMinesweeperState;

  constructor(CommitsProps: IMinesweeperProps) {
    super(CommitsProps);

    if (this.props.location.state) {
      console.log(this.props.location.state);
    }
    const board = new BoardModel(10, 10);
    board.generate();

    this.state = { board: board, state: "PROGRESS" };

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onRightClickHandler = this.onRightClickHandler.bind(this);
    this.restart = this.restart.bind(this);
  }

  onClickHandler(id: string) {
    const positions = id.split(":");
    const x = Number(positions[0]);
    const y = Number(positions[1]);

    this.state.board.open(x, y);
    this.setState({ board: this.state.board });

    this.checkGameState();
  }

  onRightClickHandler(event: any) {
    event.preventDefault();

    const positions = event.target.id.split(":");

    const x = Number(positions[0]);
    const y = Number(positions[1]);

    this.state.board.flag(x, y);
    this.setState({ board: this.state.board });
  }

  checkGameState() {
    this.setState({ state: this.state.board.status });
  }

  restart() {
    this.state.board.generate();
    this.setState({ board: this.state.board, state: "PROGRESS" });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="minesweeper">
        <Stats status={this.state.state} flags={this.state.board.flags}></Stats>
        <button onClick={this.restart}>Restart</button>
        <Board
          board={this.state.board}
          blocked={this.state.board.status === "LOST"}
          onClickHandler={this.onClickHandler}
          onRightClickHandler={this.onRightClickHandler}
        ></Board>
        <Gameover show={this.state.state === "LOST"}></Gameover>
      </div>
    );
  }
}

export default Minesweeper;
