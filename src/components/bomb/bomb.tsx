import React from "react";
import "./bomb.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

export interface BombProps {
  id: string;
}

export interface BombState {}

class Bomb extends React.Component<BombProps, BombState> {
  readonly state: BombState;

  constructor(valueProps: BombProps) {
    super(valueProps);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <td className="bomb">
        <FontAwesomeIcon icon={faBomb} size="1x" />
      </td>
    );
  }
}

export default Bomb;
