import React from "react";
import "./flag.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

export interface FlagProps {
  id: string;
  onClickHandler: any;
  onRightClickHandler: any;
}

export interface FlagState {}

class Flag extends React.Component<FlagProps, FlagState> {
  readonly state: FlagState;
  private flag = React.createRef<HTMLTableDataCellElement>();

  constructor(valueProps: FlagProps) {
    super(valueProps);

    this.state = {};
  }

  componentDidMount() {
    if (this.flag.current) {
      this.flag.current.addEventListener(
        "contextmenu",
        this.props.onRightClickHandler
      );
    }
  }

  render() {
    return (
      <td
        className="flag"
        ref={this.flag}
        id={this.props.id}
        onClick={(e) => this.props.onClickHandler(this.props.id)}
      >
        <FontAwesomeIcon icon={faFlag} size="1x" />
      </td>
    );
  }
}

export default Flag;
