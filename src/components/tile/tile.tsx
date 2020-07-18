import React from "react";
import "./tile.scss";
import ReactDOM from "react-dom";

export interface TileProps {
  id: string;
  onClickHandler: any;
  onRightClickHandler: any;
}

export interface TileState {}

class Tile extends React.Component<TileProps, TileState> {
  readonly state: TileState;
  private tile = React.createRef<HTMLTableDataCellElement>();

  constructor(tileProps: TileProps) {
    super(tileProps);

    this.state = {};
  }

  componentDidMount() {
    if (this.tile.current) {
      this.tile.current.addEventListener(
        "contextmenu",
        this.props.onRightClickHandler
      );
    }
  }

  render() {
    return this.drawClose();
  }

  drawClose() {
    return (
      <td
        id={this.props.id}
        ref={this.tile}
        className="tile"
        onClick={(e) => this.props.onClickHandler(this.props.id)}
      ></td>
    );
  }
}

export default Tile;
