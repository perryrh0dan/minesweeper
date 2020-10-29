import React from "react";
import Value from "../value/value";
import Bomb from "../bomb/bomb";
import Tile from "../tile/tile";
import Flag from "../flag/flag";
import { TileModel } from "../../../models/tile";
import { BombTileModel } from "../../../models/bombTile";
import { ValueTileModel } from "../../../models/valueTile";
import { BoardModel, Status } from "../../../models/board";

import "./board.scss";
import Gameover from "../../gameover/gameover";
import Win from "../../win/win";

export interface IBoardProps {
  board: BoardModel;
  blocked: boolean;
  onClickHandler: any;
  onRightClickHandler: any;
}

export default function Board(props: IBoardProps) {
  function buildColumn(column: Array<TileModel>, index: number) {
    return <tr key={index}>{column.map((tile) => buildTile(tile))}</tr>;
  }

  function buildTile(tile: TileModel) {
    if (tile.state === "CLOSE") {
      if (tile.flagged) {
        return (
          <Flag
            key={`${tile.x}:${tile.y}`}
            id={`${tile.x}:${tile.y}`}
            onClickHandler={props.onClickHandler}
            onRightClickHandler={props.onRightClickHandler}
          ></Flag>
        );
      } else {
        return (
          <Tile
            key={`${tile.x}:${tile.y}`}
            id={`${tile.x}:${tile.y}`}
            onClickHandler={props.onClickHandler}
            onRightClickHandler={props.onRightClickHandler}
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

  return (
    <div className="board">
      <Gameover show={props.board.status === Status.LOST}></Gameover>
      <Win show={props.board.status === Status.WIN}></Win>
      {props.blocked && <div className="blur"></div>}
      <table>
        <tbody>
          {props.board.tiles.map((column, index) => buildColumn(column, index))}
        </tbody>
      </table>
    </div>
  );
}
