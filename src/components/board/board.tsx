import React from "react";
import Value from "../value/value";
import Bomb from "../bomb/bomb";
import Tile from "../tile/tile";
import Flag from "../flag/flag";
import { TileModel } from "../../models/tile";
import { BombTileModel } from "../../models/bombTile";
import { ValueTileModel } from "../../models/valueTile";
import { BoardModel } from "../../models/board";

export interface BoardProps {
  board: BoardModel;
  onClickHandler: any;
  onRightClickHandler: any;
}

export interface BoardState {}

class Board extends React.Component<BoardProps, BoardState> {
  readonly state: BoardState;

  constructor(boardProps: BoardProps) {
    super(boardProps);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <table className="board">
        <tbody>
          {this.props.board.tiles.map((column, index) =>
            this.buildColumn(column, index)
          )}
        </tbody>
      </table>
    );
  }

  buildColumn(column: Array<TileModel>, index: number) {
    return <tr key={index}>{column.map((tile) => this.buildTile(tile))}</tr>;
  }

  buildTile(tile: TileModel) {
    if (tile.state === "CLOSE") {
      if (tile.flagged) {
        return (
          <Flag
            key={`${tile.x}:${tile.y}`}
            id={`${tile.x}:${tile.y}`}
            onClickHandler={this.props.onClickHandler}
            onRightClickHandler={this.props.onRightClickHandler}
          ></Flag>
        );
      } else {
        return (
          <Tile
            key={`${tile.x}:${tile.y}`}
            id={`${tile.x}:${tile.y}`}
            onClickHandler={this.props.onClickHandler}
            onRightClickHandler={this.props.onRightClickHandler}
          ></Tile>
        );
      }
    } else {
      if (tile instanceof ValueTileModel) {
        return (
          <Value
            key={`${tile.x}:${tile.y}`}
            id={`${tile.x}:${tile.y}`}
            value={tile.value}
          ></Value>
        );
      } else if (tile instanceof BombTileModel) {
        return (
          <Bomb key={`${tile.x}:${tile.y}`} id={`${tile.x}:${tile.y}`}></Bomb>
        );
      }
    }
  }
}

export default Board;
