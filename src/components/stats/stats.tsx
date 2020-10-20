import React from "react";

export interface IStatsProps {
  status: string;
  flags: number;
}

export default function Stats(props: IStatsProps) {
  return (
    <div className="stats">
      <div>{props.status}</div>
      <div>{props.flags}</div>
    </div>
  );
}
