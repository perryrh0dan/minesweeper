import React from "react";
import "./minesweeper.scss";
import Board from "../../components/board/board";
import { BoardModel } from "../../models/board";
import { BombTileModel } from "../../models/bombTile";

export interface MinesweeperProps {}

export interface MinesweeperState {
  board: BoardModel;
  state: "PROGRESS" | "WIN" | "LOST";
}

class Minesweeper extends React.Component<MinesweeperProps, MinesweeperState> {
  readonly state: MinesweeperState;

  constructor(CommitsProps: MinesweeperProps) {
    super(CommitsProps);

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
    let counter = 0;
    this.state.board.tiles.forEach((column) =>
      column.forEach((tile) => {
        if (tile.state === "OPEN") {
          if (tile instanceof BombTileModel) {
            this.setState({ state: "LOST" });
          }
        } else {
          counter += 1;
        }
      })
    );

    if (counter === 10) {
      this.setState({ state: "WIN" });
    }
  }

  restart() {
    this.state.board.generate();
    this.setState({ board: this.state.board, state: "PROGRESS" });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="minesweeper">
        {this.state.state}
        <button onClick={this.restart}>Restart</button>
        <Board
          board={this.state.board}
          onClickHandler={this.onClickHandler}
          onRightClickHandler={this.onRightClickHandler}
        ></Board>
      </div>
    );
  }
}

export default Minesweeper;
