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
    return <td className="value">{this.props.value}</td>;
  }
}

export default Value;
