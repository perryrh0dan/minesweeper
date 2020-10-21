import React from "react";

import "./win.scss";

export interface IWin {
  show: boolean;
}

export default function Win(props: IWin) {
  const showHideClassName = props.show
    ? "win display-block"
    : "win display-none";

  return (
    <div className={showHideClassName}>
      <h3>Win</h3>
    </div>
  );
}
