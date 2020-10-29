import React, { useState, useEffect } from "react";
import { Status } from "../../models/board";

export interface ITimerProps {
  status: Status
}

export default function Timer(props: ITimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (props.status === Status.PROGRESS) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (props.status === Status.LOST || props.status === Status.WIN) {
      clearInterval(interval)
    } else if (props.status === Status.INITIAL && seconds !== 0) {
      clearInterval(interval);
      setSeconds(0)
    }
    return () => clearInterval(interval);
  }, [props.status, seconds]);

  return <div className="time">{seconds}</div>;
}
