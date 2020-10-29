import React from "react";

import "./stats.scss";

import { Status } from "../../models/board";
import Timer from "../timer/timer";

export interface IStatsProps {
  status: Status;
  flags: number;
  timer: Status;
}

export default function Stats(props: IStatsProps) {
  return (
    <div className="stats">
      <div className="item">
        <label>Flags</label>
        <div>{props.flags}</div>
      </div>
      <div className="item">
        <label>Seconds</label>
        <Timer status={props.timer}></Timer>
      </div>
    </div>
  );
}
