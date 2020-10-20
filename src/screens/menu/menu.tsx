import React from "react";
import "./menu.scss";
import { RouteComponentProps } from "react-router-dom";

export interface NewgameProps extends RouteComponentProps {}

export interface NewgameState {}

class Menu extends React.Component<NewgameProps, NewgameState> {
  readonly state: NewgameState;

  constructor(CommitsProps: NewgameProps) {
    super(CommitsProps);

    this.state = {};

    this.startHandler = this.startHandler.bind(this);
  }

  componentDidMount() {}

  startHandler() {
    this.props.history.push(`/game?bombs=${10}?size=${10}`);
  }

  render() {
    return (
      <div className="newgame">
        <input placeholder="bombs" type="number"></input>
        <input placeholder="size" type="number"></input>

        <button onClick={this.startHandler}>Start</button>
      </div>
    );
  }
}

export default Menu;
