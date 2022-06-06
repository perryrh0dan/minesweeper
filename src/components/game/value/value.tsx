import React from "react";
import "./value.scss";

export interface ValueProps {
  id: string;
  value: number;
}

export interface ValueState {}

class Value extends React.Component<ValueProps, ValueState> {
  readonly state: ValueState;

  constructor(valueProps: ValueProps) {
    super(valueProps);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <td className={`value ${this.getClass()}`}>{this.props.value !== 0 && this.props.value}</td>;
  }

  getClass() {
    switch (this.props.value) {
      case 1:
        return "one"
      case 2:
        return "two"
      case 3:
        return "three"
      case 4:
        return "four"
      case 5:
        return "five"
      default:
        return "none"
    }
  }
}

export default Value;
