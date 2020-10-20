import React from "react";
import { Status } from "../../models/board";

export interface IStatsProps {
  status: Status;
  flags: number;
}

export default function Stats(props: IStatsProps) {
  return (
    <div className="stats">
      <span>
        <label>Flags</label>
        <div>{props.flags}</div>
      </span>
    </div>
  );
}
